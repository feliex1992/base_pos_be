import { BaseTransformer } from "src/base/base.transformer";
import { IProductCategory } from "src/modules/product-category/domain/interface/product-category.interface";
import { IProductType } from "../../domain/interface/product-type.interface";

export class ProductTypeTransformer extends BaseTransformer<IProductType> {
  process(entity: IProductType): IProductType {
    let productCategory: IProductCategory = null;

    if (entity.product_category) {
      productCategory = {
        id: entity.product_category.id,
        code: entity.product_category.code,
        description: entity.product_category.description,
      };
    }

    return {
      id: entity.id,
      code: entity.code,
      description: entity.description,
      product_category: productCategory,
    };
  }
}
