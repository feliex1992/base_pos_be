import { BaseDeleteUseCase } from "src/base/use-cases/process/base-delete.use-case";
import { Connection } from "typeorm";
import { Product } from "../../data/entities/product.entity";
import { ProductRepository } from "../../data/product.repository";
import { IProduct } from "../interface/product.interface";

export class ProductDelete extends BaseDeleteUseCase<IProduct> {
  constructor(
    private productConn: Connection,
    private productRepository: ProductRepository,
    private dataId: string,
  ) {
    super(productConn, productRepository, Product, dataId);
  }

  validateProcess(): Promise<void> {
    return;
  }

  beforeProcess(): Promise<void> {
    return;
  }

  afterProcess(): Promise<void> {
    return;
  }
}
