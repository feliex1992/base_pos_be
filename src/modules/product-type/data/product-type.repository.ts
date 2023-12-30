import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TABLE_NAME } from "src/base/base-constant";
import { BaseDataRepository } from "src/base/base-data.repository";
import { Repository } from "typeorm";
import { IProductType } from "../domain/interface/product-type.interface";
import { ProductType } from "./entities/product-type.entity";

@Injectable()
export class ProductTypeRepository extends BaseDataRepository<IProductType>{
  tableName: string = TABLE_NAME.PRODUCT_TYPE;
  relations: string[] = ["product_category", "created_by", "updated_by"];

  constructor(
    @InjectRepository(ProductType)
    public repository: Repository<IProductType>,
  ) {
    super(repository);
  }
}