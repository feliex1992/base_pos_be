import { Injectable } from '@nestjs/common';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { IBatchResult } from 'src/base/interface/batch-result.interface';
import { Connection } from 'typeorm';
import { CreateSupplierDto } from '../controller/dto/create-supplier.dto';
import { SupplierGetManyDto } from '../controller/dto/supplier-get-many.dto';
import { UpdateSupplierDto } from '../controller/dto/update-supplier.dto';
import { SupplierRepository } from '../data/supplier.repository';
import { ISupplier } from './interface/supplier.interface';
import { SupplierCreate } from './use-case/supplier.create';
import { SupplierDelete } from './use-case/supplier.delete';
import { SupplierGetMany } from './use-case/supplier.get-many';
import { SupplierUpdate } from './use-case/supplier.update';

@Injectable()
export class SupplierService {
  constructor(
    private connection: Connection,
    private supplierRepository: SupplierRepository,
  ) {}

  async create(createDto: CreateSupplierDto) {
    const supplierCreate = new SupplierCreate(
      this.connection,
      this.supplierRepository,
      createDto,
    );
    await supplierCreate.execute();
    return supplierCreate.getResult();
  }

  async getMany(params: SupplierGetManyDto): Promise<Pagination<ISupplier, IPaginationMeta>> {
    const supplierGetMany = new SupplierGetMany(
      this.supplierRepository,
      params,
    )
    await supplierGetMany.execute();
    return supplierGetMany.getResult();
  }

  async update(dataId: string, updateDto: UpdateSupplierDto): Promise<ISupplier> {
    const supplierUpdate = new SupplierUpdate(
      this.connection,
      this.supplierRepository,
      dataId,
      updateDto,
    );
    await supplierUpdate.execute();
    return supplierUpdate.getResult();
  }

  async delete(id: string): Promise<IBatchResult> {
    const supplierDelete = new SupplierDelete(
      this.connection,
      this.supplierRepository,
      id
    );
    await supplierDelete.execute();
    return supplierDelete.getResult();
  }
}
