import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TABLE_NAME } from "src/base/base-constant";
import { BaseDataRepository } from "src/base/base-data.repository";
import { Repository } from "typeorm";
import { IStockFifo } from "../domain/interface/stock-fifo.interface";
import { StockFifo } from "./entities/stock-fifo.entity";

@Injectable()
export class StockFifoRepository extends BaseDataRepository<IStockFifo> {
  tableName: string = TABLE_NAME.STOCK_FIFO;
  relations: string[] = [
    "product",
    "warehouse",
  ];

  constructor(
    @InjectRepository(StockFifo)
    public repository: Repository<IStockFifo>,
  ) {
    super(repository);
  }
}