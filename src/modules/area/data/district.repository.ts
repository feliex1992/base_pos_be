import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TABLE_NAME } from "src/base/base-constant";
import { BaseDataRepository } from "src/base/base-data.repository";
import { Repository } from "typeorm";
import { IDistrict } from "../domain/interface/district.interface";
import { District } from "./entities/district.entity";

@Injectable()
export class DistrictRepository extends BaseDataRepository<IDistrict> {
  tableName: string = TABLE_NAME.DISTRICT;
  relations: string[] = ["province"];

  constructor(
    @InjectRepository(District)
    public repository: Repository<IDistrict>,
  ) {
    super(repository);
  }
}