import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TABLE_NAME } from "src/base/base-constant";
import { BaseDataRepository } from "src/base/base-data.repository";
import { Repository } from "typeorm";
import { ISale } from "../domain/interface/sale.interface";
import { Sale } from "./entities/sale.entity";

@Injectable()
export class SaleRepository extends BaseDataRepository<ISale> {
  tableName: string = TABLE_NAME.SALE;
  relations: string[] = [
    "customer",
    "detail",
    "detail.product",
    "detail.unit_retail",
    "detail.unit_pack",
    "created_by",
    "updated_by",
  ];

  constructor(
    @InjectRepository(Sale)
    public repository: Repository<ISale>,
  ) {
    super(repository);
  }
}