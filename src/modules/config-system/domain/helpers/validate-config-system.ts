import { WarehouseRepository } from "src/modules/warehouse/data/warehouse.repository";
import { IConfigSystem } from "../interface/config-system.interface";

export async function validateConfigSystem(
  warehouseRepository: WarehouseRepository,
  configSystem: IConfigSystem,
) {
  const cekWarehouse = await warehouseRepository.getOne({
    where: { id: configSystem.warehouse_purchase.id },
  });

  if (!cekWarehouse) {
    throw new Error("Data gudang pembelian tidak di temukan!");
  }
}