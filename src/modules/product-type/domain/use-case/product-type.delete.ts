import { BaseDeleteUseCase } from "src/base/use-cases/process/base-delete.use-case";
import { Connection } from "typeorm";
import { ProductType } from "../../data/entities/product-type.entity";
import { ProductTypeRepository } from "../../data/product-type.repository";
import { IProductType } from "../interface/product-type.interface";

export class ProductTypeDelete extends BaseDeleteUseCase<IProductType> {
  constructor(
    private productTypeConn: Connection,
    private productTypeRepository: ProductTypeRepository,
    private dataId: string,
  ) {
    super(productTypeConn, productTypeRepository, ProductType, dataId);
  }

  validateProcess(): Promise<void> {
    return;
  }

  beforeProcess(): Promise<void> {
    // TODO cek if data product type is used in data product.
    return;
  }

  afterProcess(): Promise<void> {
    return;
  }
}