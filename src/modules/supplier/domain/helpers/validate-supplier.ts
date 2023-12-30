import { SupplierRepository } from "../../data/supplier.repository";
import { ISupplier } from "../interface/supplier.interface";

export async function validateSupplier(
  supplierRepository: SupplierRepository,
  dataId: string,
  supplier: ISupplier,
): Promise<void> {
  const cekSupplier = await supplierRepository.getOne({
    where: { code: supplier.code },
  });

  if (cekSupplier) {
    if (dataId) {
      if (dataId !== cekSupplier.id) throw new Error('Kode supplier sudah digunakan!');
    } else {
      throw new Error('Kode supplier sudah digunakan!');
    }
  }
}
