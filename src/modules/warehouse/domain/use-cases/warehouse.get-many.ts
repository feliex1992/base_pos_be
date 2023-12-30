import { BaseGetManyUseCase } from "src/base/use-cases/process/base-get-many.use-case";
import { WarehouseGetManyDto } from "../../controller/dto/warehouse-get-many.dto";
import { WarehouseRepository } from "../../data/warehouse.repository";
import { IWarehouse } from "../interface/warehouse.interface";

export class WarehouseGetMany extends BaseGetManyUseCase<IWarehouse> {
  constructor(
    public warehouseRepository: WarehouseRepository,
    public getManyDto: WarehouseGetManyDto,
  ) {
    super(warehouseRepository, getManyDto);
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