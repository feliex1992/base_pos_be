import { Injectable } from '@nestjs/common';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { IBatchResult } from 'src/base/interface/batch-result.interface';
import { Connection } from 'typeorm';
import { CreateWarehouseDto } from '../controller/dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../controller/dto/update-warehouse.dto';
import { WarehouseGetManyDto } from '../controller/dto/warehouse-get-many.dto';
import { WarehouseRepository } from '../data/warehouse.repository';
import { IWarehouse } from './interface/warehouse.interface';
import { WarehouseCreate } from './use-cases/warehouse.create';
import { WarehouseDelete } from './use-cases/warehouse.delete';
import { WarehouseGetMany } from './use-cases/warehouse.get-many';
import { WarehouseUpdate } from './use-cases/warehouse.update';

@Injectable()
export class WarehouseService {
  constructor(
    private connection: Connection,
    private warehouseRepository: WarehouseRepository,
  ) {}

  async create(createDto: CreateWarehouseDto) {
    const warehouseCreate = new WarehouseCreate(
      this.connection,
      this.warehouseRepository,
      createDto,
    );
    await warehouseCreate.execute();
    return warehouseCreate.getResult();
  }

  async getMany(params: WarehouseGetManyDto): Promise<Pagination<IWarehouse, IPaginationMeta>> {
    const warehouseGetMany = new WarehouseGetMany(
      this.warehouseRepository,
      params,
    )
    await warehouseGetMany.execute();
    return warehouseGetMany.getResult();
  }

  async update(dataId: string, updateDto: UpdateWarehouseDto): Promise<IWarehouse> {
    const warehouseUpdate = new WarehouseUpdate(
      this.connection,
      this.warehouseRepository,
      dataId,
      updateDto,
    );
    await warehouseUpdate.execute();
    return warehouseUpdate.getResult();
  }

  async delete(id: string): Promise<IBatchResult> {
    const warehouseDelete = new WarehouseDelete(
      this.connection,
      this.warehouseRepository,
      id
    );
    await warehouseDelete.execute();
    return warehouseDelete.getResult();
  }
}
