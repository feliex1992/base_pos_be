import { ProductCategoryRepository } from "src/modules/product-category/data/product-category.repository";
import { ProductTypeRepository } from "../../data/product-type.repository";
import { IProductType } from "../interface/product-type.interface";

export async function validateProductType(
  productTypeRepository: ProductTypeRepository,
  productCategoryRepository: ProductCategoryRepository,
  dataId: string,
  productType: IProductType,
): Promise<void> {
  const cekProductType = await productTypeRepository.getOne({
    where: { code: productType.code },
  });

  if (cekProductType) {
    if (dataId) {
      if (dataId !== cekProductType.id) throw new Error('Kode jenis sudah digunakan!');
    } else {
      throw new Error('Kode jenis sudah digunakan!');
    }
  }

  const cekProductCategory = await productCategoryRepository.getOne({
    where: { id: productType.product_category.id },
  });
  if (!cekProductCategory) throw new Error('Data kategori produk tidak di temukan!');
}
