import { Connection, EntityTarget } from 'typeorm';
import { BaseDataRepository } from '../../base-data.repository';
import { BaseUseCase } from '../base.use-case';

export abstract class BaseUpdateUseCase<Entity> extends BaseUseCase<Entity> {
  result: Entity;

  constructor(
    connection: Connection,
    private dataRepository: BaseDataRepository<Entity>,
    private entityTarget: EntityTarget<Entity>,
    private id: string,
    public updatedData: Entity,
  ) {
    super(connection);
  }

  async prepareData(): Promise<void> {
    Object.assign(this.updatedData, {
      updated_id: this.user.id
    });
  }

  async process(): Promise<void> {
    this.result = await this.dataRepository.updateDataById(
      this.queryRunner,
      this.entityTarget,
      this.id,
      this.updatedData,
    );
  }

  async getResult() {
    const result = await this.dataRepository.getOne({
      where: { id: this.result['id'] },
    });
    return result;
  }
}
