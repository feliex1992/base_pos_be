import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TABLE_NAME } from "src/base/base-constant";
import { BaseDataRepository } from "src/base/base-data.repository";
import { Repository } from "typeorm";
import { IWarehouse } from "../domain/interface/warehouse.interface";
import { Warehouse } from "./entities/warehouse.entity";

@Injectable()
export class WarehouseRepository extends BaseDataRepository<IWarehouse> {
  tableName: string = TABLE_NAME.WAREHOUSE;
  relations: string[] = ["created_by", "updated_by"];

  constructor(
    @InjectRepository(Warehouse)
    public repository: Repository<IWarehouse>,
  ) {
    super(repository);
  }
}