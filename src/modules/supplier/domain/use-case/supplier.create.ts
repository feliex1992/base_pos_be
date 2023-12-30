import { BaseCreateUseCase } from "src/base/use-cases/process/base-create.use-case";
import { Connection } from "typeorm";
import { Supplier } from "../../data/entities/supplier.entity";
import { SupplierRepository } from "../../data/supplier.repository";
import { validateSupplier } from "../helpers/validate-supplier";
import { ISupplier } from "../interface/supplier.interface";

export class SupplierCreate extends BaseCreateUseCase<ISupplier> {
  constructor(
    private supplierConn: Connection,
    private supplierRepository: SupplierRepository,
    private supplier: ISupplier,
  ) {
    super(supplierConn, supplierRepository, Supplier, supplier);
  }

  async beforeProcess(): Promise<void> {
    await validateSupplier(
      this.supplierRepository,
      undefined,
      this.supplier
    );
    return;
  }
}
