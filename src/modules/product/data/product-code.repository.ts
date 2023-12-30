import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TABLE_NAME } from "src/base/base-constant";
import { BaseDataRepository } from "src/base/base-data.repository";
import { Repository } from "typeorm";
import { IProductCode } from "../domain/interface/product-code.interface";
import { ProductCode } from "./entities/product-code.entity";

@Injectable()
export class ProductCodeRepository extends BaseDataRepository<IProductCode> {
  tableName: string = TABLE_NAME.TP_PRODUCT_CODE;
  relations: string[] = [];

  constructor(
    @InjectRepository(ProductCode)
    public repository: Repository<IProductCode>,
  ) {
    super(repository);
  }
}