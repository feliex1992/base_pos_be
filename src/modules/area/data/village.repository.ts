import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TABLE_NAME } from "src/base/base-constant";
import { BaseDataRepository } from "src/base/base-data.repository";
import { Repository } from "typeorm";
import { IVillage } from "../domain/interface/village.interface";
import { Village } from "./entities/village.entity";

@Injectable()
export class VillageRepository extends BaseDataRepository<IVillage> {
  tableName: string = TABLE_NAME.VILLAGE;
  relations: string[] = ["sub_district"];

  constructor(
    @InjectRepository(Village)
    public repository: Repository<IVillage>,
  ) {
    super(repository);
  }
}