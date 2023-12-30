import { ProductCategoryRepository } from "../../data/product-category.repository";
import { IProductCategory } from "../interface/product-category.interface";

export async function validateProductCategory(
  productCategoryRepository: ProductCategoryRepository,
  dataId: string,
  productCategory: IProductCategory,
) {
  const cekData = await productCategoryRepository.getOne({
    where: { code: productCategory.code },
  });
  if (cekData) {
    if (dataId) {
      if (dataId !== cekData.id)
        throw new Error(
          `Kode produk kategori: ${productCategory.code} sudah digunakan!`,
        );
    } else {
      throw new Error(
        `Kode produk kategori: ${productCategory.code} sudah digunakan!`,
      );
    }
  }
}
