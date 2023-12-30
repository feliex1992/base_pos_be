import { BaseUpdateUseCase } from "src/base/use-cases/process/base-update.use-case";
import { Connection } from "typeorm";
import { Supplier } from "../../data/entities/supplier.entity";
import { SupplierRepository } from "../../data/supplier.repository";
import { validateSupplier } from "../helpers/validate-supplier";
import { ISupplier } from "../interface/supplier.interface";

export class SupplierUpdate extends BaseUpdateUseCase<ISupplier> {
  constructor(
    private supplierConn: Connection,
    private supplierRepository: SupplierRepository,
    private dataId: string,
    private supplier: ISupplier,
  ) {
    super(supplierConn, supplierRepository, Supplier, dataId, supplier);
  }

  async beforeProcess(): Promise<void> {
    await validateSupplier(
      this.supplierRepository,
      this.dataId,
      this.supplier
    )
    return;
  }

  afterProcess(): Promise<void> {
    return;
  }
}
