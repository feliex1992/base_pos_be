import { BaseUpdateUseCase } from "src/base/use-cases/process/base-update.use-case";
import { Connection } from "typeorm";
import { ProductCategory } from "../../data/entities/product-category.entity";
import { ProductCategoryRepository } from "../../data/product-category.repository";
import { validateProductCategory } from "../helpers/validate-product-category";
import { IProductCategory } from "../interface/product-category.interface";

export class ProductCategoryUpdate extends BaseUpdateUseCase<IProductCategory> {
  constructor(
    private productCategoryConn: Connection,
    private productCategoryRepository: ProductCategoryRepository,
    private dataId: string,
    private productCategory: IProductCategory,
  ) {
    super(productCategoryConn, productCategoryRepository, ProductCategory, dataId, productCategory);
  }

  async beforeProcess(): Promise<void> {
    await validateProductCategory(
      this.productCategoryRepository,
      this.dataId,
      this.productCategory
    );
    return;
  }

  afterProcess(): Promise<void> {
    return;
  }
}