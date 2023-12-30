import { Injectable } from '@nestjs/common';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { IBatchResult } from 'src/base/interface/batch-result.interface';
import { Connection } from 'typeorm';
import { CreateUomDto } from '../controller/dto/create-uom.dto';
import { UomGetManyDto } from '../controller/dto/uom-get-many.dto';
import { UpdateUomDto } from '../controller/dto/update-uom.dto';
import { UomRepository } from '../data/uom.repository';
import { IUom } from './interface/uom.interface';
import { UomCreate } from './use-case/uom.create';
import { UomDelete } from './use-case/uom.delete';
import { UomGetMany } from './use-case/uom.get-many';
import { UomUpdate } from './use-case/uom.update';

@Injectable()
export class UomService {
  constructor(
    private connection: Connection,
    private uomRepository: UomRepository,
  ) {}

  async create(createUomDto: CreateUomDto) {
    const uomCreate = new UomCreate(
      this.connection,
      this.uomRepository,
      createUomDto,
    );
    await uomCreate.execute();
    return uomCreate.getResult();
  }

  async getMany(params: UomGetManyDto): Promise<Pagination<IUom, IPaginationMeta>> {
    const uomGetMany = new UomGetMany(
      this.uomRepository,
      params,
    )
    await uomGetMany.execute();
    return uomGetMany.getResult();
  }

  async update(dataId: string, updateUomDto: UpdateUomDto): Promise<IUom> {
    const uomUpdate = new UomUpdate(
      this.connection,
      this.uomRepository,
      dataId,
      updateUomDto,
    );
    await uomUpdate.execute();
    return uomUpdate.getResult();
  }

  async delete(id: string): Promise<IBatchResult> {
    const uomDelete = new UomDelete(
      this.connection,
      this.uomRepository,
      id
    );
    await uomDelete.execute();
    return uomDelete.getResult();
  }
}
