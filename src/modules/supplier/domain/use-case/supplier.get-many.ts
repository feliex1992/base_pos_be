import { BaseGetManyUseCase } from "src/base/use-cases/process/base-get-many.use-case";
import { SupplierGetManyDto } from "../../controller/dto/supplier-get-many.dto";
import { SupplierRepository } from "../../data/supplier.repository";
import { ISupplier } from "../interface/supplier.interface";

export class SupplierGetMany extends BaseGetManyUseCase<ISupplier> {
  constructor(
    public supplierRepository: SupplierRepository,
    public getManyDto: SupplierGetManyDto,
  ) {
    super(supplierRepository, getManyDto);
  }

  beforeProcess(): Promise<void> {
    return;
  }

  setFilterSearch(): string[] {
    return [`${this.table_name}.code`, `${this.table_name}.description`];
  }

  afterProcess(): Promise<void> {
    return;
  }
}