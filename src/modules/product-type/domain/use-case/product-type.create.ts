import { BaseCreateUseCase } from "src/base/use-cases/process/base-create.use-case";
import { ProductCategoryRepository } from "src/modules/product-category/data/product-category.repository";
import { Connection } from "typeorm";
import { ProductType } from "../../data/entities/product-type.entity";
import { ProductTypeRepository } from "../../data/product-type.repository";
import { validateProductType } from "../helpers/validate-product-type";
import { IProductType } from "../interface/product-type.interface";

export class ProductTypeCreate extends BaseCreateUseCase<IProductType>{
  constructor(
    private productTypeConn: Connection,
    private productTypeRepository: ProductTypeRepository,
    private productType: IProductType,
    private productCategoryRepository: ProductCategoryRepository,
  ) {
    super(productTypeConn, productTypeRepository, ProductType, productType);
  }

  async beforeProcess(): Promise<void> {
    await validateProductType(
      this.productTypeRepository,
      this.productCategoryRepository,
      undefined,
      this.productType,
    );
    return;
  }
}