import { Pagination } from 'nestjs-typeorm-paginate';
import { BaseDataRepository } from 'src/base/base-data.repository';
import { BaseFilterDto } from 'src/base/dto/base-filter.dto';
import { Brackets, SelectQueryBuilder } from 'typeorm';
import { BaseReadUseCase } from '../base-read.use-case';

export abstract class BaseGetManyUseCase<Entity> extends BaseReadUseCase {
  result: Pagination<Entity>;

  constructor(
    public dataRepository: BaseDataRepository<Entity>,
    public baseFilter: BaseFilterDto,
  ) {
    super();
    this.table_name = dataRepository.getTableName();
  }

  abstract beforeProcess(): Promise<void>;

  async process(): Promise<void> {
    const repository = this.dataRepository.getRepository();
    const relations = this.dataRepository.getRelations();

    const orderBy: [{ field: string; order_type: 'ASC' | 'DESC' }] =
      this.getOrderBY();
    const filterSearch: string[] = this.setFilterSearch();

    const queryBuilder = repository.createQueryBuilder(this.table_name);

    relations.map((relation) => {
      switch (relation.split(".").length) {
        case (1):
          queryBuilder.leftJoinAndSelect(
            `${this.table_name}.${relation}`,
            relation,
          );
          break;
        case (2):
          queryBuilder.leftJoinAndSelect(relation, relation.split('.')[1]);
          break;
        case (3):
          queryBuilder.leftJoinAndSelect(
            `${relation.split(".")[1]}.${relation.split(".")[2]}`,
            relation.split('.')[2],
          );
          break;
        case (4):
          queryBuilder.leftJoinAndSelect(
            `${relation.split(".")[2]}.${relation.split(".")[3]}`,
            relation.split('.')[3],
          );
          break;
        default:
      }
    });

    queryBuilder.where(
      new Brackets((qb) => {
        qb.andWhere(`${this.table_name}.id IS NOT NULL`)
      })
    )

    if (this.baseFilter.search_by)
      queryBuilder.andWhere(
        new Brackets((qb) => {
          filterSearch.map((fSearch) => {
            qb.orWhere(`LOWER(${fSearch}) LIKE LOWER(:query)`, {
              query: `%${!this.baseFilter.search_by ? '' : this.baseFilter.search_by}%`
            })
          })
        })
      )

    this.setQueryFilter(queryBuilder);
    this.setQueryFilterDefault(queryBuilder);

    for (let o = 0; o < orderBy.length; o++) {
      if (o == 0) {
        queryBuilder.orderBy(orderBy[o].field, orderBy[o].order_type);
      } else {
        queryBuilder.addOrderBy(orderBy[o].field, orderBy[o].order_type);
      }
    }
    this.result = await this.dataRepository.getMany(queryBuilder, {
      page: this.baseFilter.page,
      limit: this.baseFilter.limit,
    });
  }

  abstract afterProcess(): Promise<void>;

  setFilterSearch(): string[] {
    return [];
  }

  setQueryFilter(
    queryBuilder: SelectQueryBuilder<Entity>,
  ): SelectQueryBuilder<Entity> {
    return queryBuilder;
  }

  setQueryFilterDefault(
    queryBuilder: SelectQueryBuilder<Entity>,
  ): SelectQueryBuilder<Entity> {
    // TODO add query filter default here (like filter by created date)
    return queryBuilder;
  }

  getOrderBY(): [{ field: string; order_type: 'ASC' | 'DESC' }] {
    try{
      if (this.baseFilter.order_by) {
        const objFilter = JSON.parse(this.baseFilter.order_by);
        let resFilter: [{ field: string; order_type: 'ASC' | 'DESC' }];

        for(let key in Object.keys(objFilter)) {
          if (resFilter) {
            resFilter.push({
              field: `${this.table_name}.${Object.keys(objFilter)[key]}`,
              order_type: objFilter[Object.keys(objFilter)[key]],
            });
          } else {
            resFilter = [{
              field: `${this.table_name}.${Object.keys(objFilter)[key]}`,
              order_type: objFilter[Object.keys(objFilter)[key]],
            }];
          }
        }

        return resFilter;
      }
    } catch (err) {}

    return [
      {field: `${this.table_name}.created_date`, order_type: 'DESC'}
    ]
  }

  getResult(): Pagination<Entity> {
    return this.result;
  }
}
