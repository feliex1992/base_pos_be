import { ProductTypeRepository } from "src/modules/product-type/data/product-type.repository";
import { UomRepository } from "src/modules/uom/data/uom.repository";
import { ProductCodeRepository } from "../../data/product-code.repository";
import { ProductRepository } from "../../data/product.repository";
import { IProduct } from "../interface/product.interface";

export async function validateProduct(
  productRepository: ProductRepository,
  dataId: string,
  product: IProduct,
  productTypeRepository: ProductTypeRepository,
  uomRepository: UomRepository,
): Promise<void> {
  const cekProduct = await productRepository.getOne({
    where: { code: product.code },
  });

  if (cekProduct) {
    if (dataId) {
      if (dataId !== cekProduct.id) throw new Error("Kode produk sudah digunakan!");
    } else {
      throw new Error("Kode produk sudah digunakan!");
    }
  }

  const cekProductType = await productTypeRepository.getOne({
    where: {id: product.product_type.id}
  });
  if (!cekProductType) throw new Error("Data jenis produk tidak di temukan!");

  const cekUnitRetail = await uomRepository.getOne({
    where: {id: product.unit_retail.id}
  });
  if (!cekUnitRetail) throw new Error("Data satuan retail tidak di temukan!");

  const cekUnitPack = await uomRepository.getOne({
    where: {id: product.unit_pack.id}
  });
  if (!cekUnitPack) throw new Error("Data satuan pak tidak di temukan!");

  const cekUnitBuy = await uomRepository.getOne({
    where: {id: product.unit_buy.id}
  });
  if (!cekUnitBuy) throw new Error("Data satuan beli tidak di temukan!");

  if (product.unit_retail.id === product.unit_pack.id && product.unit_pack_content !== 1) throw new Error("Invalid isi satuan pak!");
  if (product.unit_retail.id === product.unit_buy.id && product.unit_buy_content !== 1) throw new Error("Invalid isi satuan beli!");
}
