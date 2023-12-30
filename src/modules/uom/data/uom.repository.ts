import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TABLE_NAME } from "src/base/base-constant";
import { BaseDataRepository } from "src/base/base-data.repository";
import { Repository } from "typeorm";
import { IUom } from "../domain/interface/uom.interface";
import { Uom } from "./entities/uom.entity";

@Injectable()
export class UomRepository extends BaseDataRepository<IUom>{
  tableName: string = TABLE_NAME.UOM;
  relations: string[] = ["created_by", "updated_by"];

  constructor(
    @InjectRepository(Uom)
    public repository: Repository<IUom>,
  ) {
    super(repository);
  }
}