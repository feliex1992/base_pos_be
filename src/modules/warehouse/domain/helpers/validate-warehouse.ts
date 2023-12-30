import { WarehouseRepository } from "../../data/warehouse.repository";
import { IWarehouse } from "../interface/warehouse.interface";

export async function validateWarehouse(
  warehouseRepository: WarehouseRepository,
  dataId: string,
  warehouse: IWarehouse,
): Promise<void> {
  const cekWarehouse = await warehouseRepository.getOne({
    where: { code: warehouse.code },
  });

  if (cekWarehouse) {
    if (dataId) {
      if (dataId !== cekWarehouse.id) throw new Error('Kode gudang sudah digunakan!');
    } else {
      throw new Error('Kode gudang sudah digunakan!');
    }
  }
}
