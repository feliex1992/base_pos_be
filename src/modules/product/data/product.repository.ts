import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TABLE_NAME } from "src/base/base-constant";
import { BaseDataRepository } from "src/base/base-data.repository";
import { Product } from "./entities/product.entity";
import { IProduct } from "../domain/interface/product.interface";
import { Repository } from "typeorm";

@Injectable()
export class ProductRepository extends BaseDataRepository<IProduct> {
  tableName: string = TABLE_NAME.PRODUCT;
  relations: string[] = [
    "product_type",
    "product_type.product_category",
    "unit_retail",
    "unit_pack",
    "unit_buy",
    "created_by",
    "updated_by",
  ];

  constructor(
    @InjectRepository(Product)
    public repository: Repository<IProduct>,
  ) {
    super(repository);
  }
}