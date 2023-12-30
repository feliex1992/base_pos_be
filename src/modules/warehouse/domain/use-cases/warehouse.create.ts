import { BaseCreateUseCase } from "src/base/use-cases/process/base-create.use-case";
import { Connection } from "typeorm";
import { Warehouse } from "../../data/entities/warehouse.entity";
import { WarehouseRepository } from "../../data/warehouse.repository";
import { validateWarehouse } from "../helpers/validate-warehouse";
import { IWarehouse } from "../interface/warehouse.interface";

export class WarehouseCreate extends BaseCreateUseCase<IWarehouse> {
  constructor(
    private warehouseConn: Connection,
    private warehouseRepository: WarehouseRepository,
    private warehouse: IWarehouse,
  ) {
    super(warehouseConn, warehouseRepository, Warehouse, warehouse);
  }

  async beforeProcess(): Promise<void> {
    await validateWarehouse(
      this.warehouseRepository,
      undefined,
      this.warehouse
    );
    return;
  }
}