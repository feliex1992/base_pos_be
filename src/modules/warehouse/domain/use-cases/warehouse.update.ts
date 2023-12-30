import { BaseUpdateUseCase } from "src/base/use-cases/process/base-update.use-case";
import { Connection } from "typeorm";
import { Warehouse } from "../../data/entities/warehouse.entity";
import { WarehouseRepository } from "../../data/warehouse.repository";
import { validateWarehouse } from "../helpers/validate-warehouse";
import { IWarehouse } from "../interface/warehouse.interface";

export class WarehouseUpdate extends BaseUpdateUseCase<IWarehouse> {
  constructor(
    private warehouseConn: Connection,
    private warehouseRepository: WarehouseRepository,
    private dataId: string,
    private warehouse: IWarehouse,
  ) {
    super(warehouseConn, warehouseRepository, Warehouse, dataId, warehouse);
  }

  async beforeProcess(): Promise<void> {
    await validateWarehouse(
      this.warehouseRepository,
      this.dataId,
      this.warehouse
    )
    return;
  }

  afterProcess(): Promise<void> {
    return;
  }
}
