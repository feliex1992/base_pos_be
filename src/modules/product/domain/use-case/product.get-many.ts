import { BaseGetManyUseCase } from "src/base/use-cases/process/base-get-many.use-case";
import { ProductGetManyDto } from "../../controller/dto/product-get-many.dto";
import { ProductRepository } from "../../data/product.repository";
import { IProduct } from "../interface/product.interface";

export class ProductGetMany extends BaseGetManyUseCase<IProduct> {
  constructor(
    public productRepository: ProductRepository,
    public getManyDto: ProductGetManyDto,
  ) {
    super(productRepository, getManyDto);
  }

  beforeProcess(): Promise<void> {
    return;
  }

  setFilterSearch(): string[] {
    return [`${this.table_name}.code`, `${this.table_name}.description`];
  }

  afterProcess(): Promise<void> {
    return;
  }
}