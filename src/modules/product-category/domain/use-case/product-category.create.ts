import { BaseCreateUseCase } from "src/base/use-cases/process/base-create.use-case";
import { Connection } from "typeorm";
import { ProductCategory } from "../../data/entities/product-category.entity";
import { ProductCategoryRepository } from "../../data/product-category.repository";
import { validateProductCategory } from "../helpers/validate-product-category";
import { IProductCategory } from "../interface/product-category.interface";

export class ProductCategoryCreate extends BaseCreateUseCase<IProductCategory>{
  constructor(
    private productCategoryConn: Connection,
    private productCategoryRepository: ProductCategoryRepository,
    private productCategory: IProductCategory
  ) {
    super(productCategoryConn, productCategoryRepository, ProductCategory, productCategory);
  }

  async beforeProcess(): Promise<void> {
    await validateProductCategory(
      this.productCategoryRepository,
      undefined,
      this.productCategory
    );
    return;
  }
}