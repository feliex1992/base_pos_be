import { UomRepository } from "../../data/uom.repository";
import { IUom } from "../interface/uom.interface";

export async function validateUom(
  uomRepository: UomRepository,
  dataId: string,
  uom: IUom,
): Promise<void> {
  const cekUom = await uomRepository.getOne({
    where: { code: uom.code },
  });

  if (cekUom) {
    if (dataId) {
      if (dataId !== cekUom.id) throw new Error('Kode satuan sudah digunakan!');
    } else {
      throw new Error('Kode satuan sudah digunakan!');
    }
  }
}
