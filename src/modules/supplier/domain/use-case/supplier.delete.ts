import { BaseDeleteUseCase } from "src/base/use-cases/process/base-delete.use-case";
import { Connection } from "typeorm";
import { Supplier } from "../../data/entities/supplier.entity";
import { SupplierRepository } from "../../data/supplier.repository";
import { ISupplier } from "../interface/supplier.interface";

export class SupplierDelete extends BaseDeleteUseCase<ISupplier> {
  constructor(
    private supplierConn: Connection,
    private supplierRepository: SupplierRepository,
    private dataId: string,
  ) {
    super(supplierConn, supplierRepository, Supplier, dataId);
  }

  validateProcess(): Promise<void> {
    return;
  }

  beforeProcess(): Promise<void> {
    return;
  }

  afterProcess(): Promise<void> {
    return;
  }
}
