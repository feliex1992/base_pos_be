import { IBase } from "src/base/interface/base.interface";
import { IProductCategory } from "src/modules/product-category/domain/interface/product-category.interface";

export interface IProductType extends IBase{
  code: string;
  description: string;
  product_category_id?: string;
  product_category?: IProductCategory;
}