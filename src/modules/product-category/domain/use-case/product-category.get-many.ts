import { TABLE_NAME } from "src/base/base-constant";
import { BaseGetManyUseCase } from "src/base/use-cases/process/base-get-many.use-case";
import { ProductCategoryGetManyDto } from "../../controller/dto/product-category-get-many.dto";
import { ProductCategoryRepository } from "../../data/product-category.repository";
import { IProductCategory } from "../interface/product-category.interface";

export class ProductCategoryGetMany extends BaseGetManyUseCase<IProductCategory>{
  constructor(
    public productCategoryRepository: ProductCategoryRepository,
    public productCategoryGetManyDto: ProductCategoryGetManyDto,
  ) {
    super(productCategoryRepository, productCategoryGetManyDto);
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