import { BaseTransformer } from "src/base/base.transformer";
import { IProductCategory } from "../../domain/interface/product-category.interface";

export class ProductCategoryTransformer extends BaseTransformer<IProductCategory> {
  process(entity: IProductCategory): IProductCategory {
    return {
      id: entity.id,
      code: entity.code,
      description: entity.description
    };
  }
}
