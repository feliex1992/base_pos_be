import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TABLE_NAME } from "src/base/base-constant";
import { BaseDataRepository } from "src/base/base-data.repository";
import { Repository } from "typeorm";
import { IStock } from "../domain/interface/stock.interface";
import { Stock } from "./entities/stock.entity";

@Injectable()
export class StockRepository extends BaseDataRepository<IStock> {
  tableName: string = TABLE_NAME.STOCK;
  relations: string[] = [
    "product",
    "warehouse",
  ];

  constructor(
    @InjectRepository(Stock)
    public repository: Repository<IStock>,
  ) {
    super(repository);
  }
}