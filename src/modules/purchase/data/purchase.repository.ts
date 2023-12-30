import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TABLE_NAME } from "src/base/base-constant";
import { BaseDataRepository } from "src/base/base-data.repository";
import { Repository } from "typeorm";
import { IPurchase } from "../domain/interface/purchase.interface";
import { Purchase } from "./entities/purchase.entity";

@Injectable()
export class PurchaseRepository extends BaseDataRepository<IPurchase> {
  tableName: string = TABLE_NAME.PURCHASE;
  relations: string[] = [
    "supplier",
    "detail",
    "detail.product",
    "detail.unit_retail",
    "detail.unit_buy",
    "created_by",
    "updated_by",
  ];

  constructor(
    @InjectRepository(Purchase)
    public repository: Repository<IPurchase>,
  ) {
    super(repository);
  }
}