import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TABLE_NAME } from "src/base/base-constant";
import { BaseDataRepository } from "src/base/base-data.repository";
import { Repository } from "typeorm";
import { IStockCard } from "../domain/interface/stock-card.interface";
import { StockCard } from "./entities/stock-card.entity";

@Injectable()
export class StockCardRepository extends BaseDataRepository<IStockCard> {
  tableName: string = TABLE_NAME.STOCK_CARD;
  relations: string[] = [
    "product",
    "warehouse",
  ];

  constructor(
    @InjectRepository(StockCard)
    public repository: Repository<IStockCard>,
  ) {
    super(repository);
  }
}