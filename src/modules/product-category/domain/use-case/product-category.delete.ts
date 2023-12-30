import { BaseDeleteUseCase } from "src/base/use-cases/process/base-delete.use-case";
import { Connection } from "typeorm";
import { ProductCategory } from "../../data/entities/product-category.entity";
import { ProductCategoryRepository } from "../../data/product-category.repository";
import { IProductCategory } from "../interface/product-category.interface";

export class ProductCategoryDelete extends BaseDeleteUseCase<IProductCategory> {
  constructor(
    private productCategoryConn: Connection,
    private productCategoryRepository: ProductCategoryRepository,
    private dataId: string,
  ) {
    super(productCategoryConn, productCategoryRepository, ProductCategory, dataId);
  }

  validateProcess(): Promise<void> {
    // TODO validate data category with data product type and product.
    return;
  }

  beforeProcess(): Promise<void> {
    return;
  }
  
  afterProcess(): Promise<void> {
    return;
  }
}