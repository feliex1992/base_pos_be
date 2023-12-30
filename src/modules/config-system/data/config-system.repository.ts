import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TABLE_NAME } from "src/base/base-constant";
import { BaseDataRepository } from "src/base/base-data.repository";
import { Repository } from "typeorm";
import { IConfigSystem } from "../domain/interface/config-system.interface";
import { ConfigSystem } from "./entities/config-system.entity";

@Injectable()
export class ConfigSystemRepository extends BaseDataRepository<IConfigSystem> {
  tableName: string = TABLE_NAME.CONFIG_SYSTEM;
  relations: string[] = ["warehouse_purchase", "created_by", "updated_by"];

  constructor(
    @InjectRepository(ConfigSystem)
    public repository: Repository<IConfigSystem>,
  ) {
    super(repository);
  }
}