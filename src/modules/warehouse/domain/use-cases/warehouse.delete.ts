import { BaseDeleteUseCase } from "src/base/use-cases/process/base-delete.use-case";
import { Connection } from "typeorm";
import { Warehouse } from "../../data/entities/warehouse.entity";
import { WarehouseRepository } from "../../data/warehouse.repository";
import { IWarehouse } from "../interface/warehouse.interface";

export class WarehouseDelete extends BaseDeleteUseCase<IWarehouse> {
  constructor(
    private warehouseConn: Connection,
    private warehouseRepository: WarehouseRepository,
    private dataId: string,
  ) {
    super(warehouseConn, warehouseRepository, Warehouse, dataId);
  }

  validateProcess(): Promise<void> {
    return;
  }

  beforeProcess(): Promise<void> {
    // TODO cek warehouse is used or not in data stock product.
    return;
  }

  afterProcess(): Promise<void> {
    return;
  }
}
