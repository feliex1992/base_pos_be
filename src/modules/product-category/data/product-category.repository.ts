import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TABLE_NAME } from "src/base/base-constant";
import { BaseDataRepository } from "src/base/base-data.repository";
import { Repository } from "typeorm";
import { IProductCategory } from "../domain/interface/product-category.interface";
import { ProductCategory } from "./entities/product-category.entity";

@Injectable()
export class ProductCategoryRepository extends BaseDataRepository<IProductCategory>{
  tableName: string = TABLE_NAME.PRODUCT_CATEGORY;
  relations: string[] = ["created_by", "updated_by"];

  constructor(
    @InjectRepository(ProductCategory)
    public repository: Repository<IProductCategory>,
  ) {
    super(repository);
  }
}
