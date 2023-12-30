import { BaseGetManyUseCase } from "src/base/use-cases/process/base-get-many.use-case";
import { ProductTypeGetManyDto } from "../../controller/dto/product-type-get-many.dto";
import { ProductTypeRepository } from "../../data/product-type.repository";
import { IProductType } from "../interface/product-type.interface";

export class ProductTypeGetMany extends BaseGetManyUseCase<IProductType> {
  constructor(
    public productTypeRepository: ProductTypeRepository,
    public productTypeGetManyDto: ProductTypeGetManyDto,
  ) {
    super(productTypeRepository, productTypeGetManyDto);
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