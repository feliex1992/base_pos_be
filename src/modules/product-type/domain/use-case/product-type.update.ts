import { BaseUpdateUseCase } from "src/base/use-cases/process/base-update.use-case";
import { ProductCategoryRepository } from "src/modules/product-category/data/product-category.repository";
import { Connection } from "typeorm";
import { ProductType } from "../../data/entities/product-type.entity";
import { ProductTypeRepository } from "../../data/product-type.repository";
import { validateProductType } from "../helpers/validate-product-type";
import { IProductType } from "../interface/product-type.interface";

export class ProductTypeUpdate extends BaseUpdateUseCase<IProductType> {
  constructor(
    private productTypeConn: Connection,
    private productTypeRepository: ProductTypeRepository,
    private dataId: string,
    private productType: IProductType,
    private productCategoryRepository: ProductCategoryRepository,
  ) {
    super(productTypeConn, productTypeRepository, ProductType, dataId, productType);
  }

  async beforeProcess(): Promise<void> {
    await validateProductType(
      this.productTypeRepository,
      this.productCategoryRepository,
      this.dataId,
      this.productType,
    );
    return;
  }

  afterProcess(): Promise<void> {
    return;
  }
}