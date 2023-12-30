import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TABLE_NAME } from "src/base/base-constant";
import { BaseDataRepository } from "src/base/base-data.repository";
import { Repository } from "typeorm";
import { ISubDistrict } from "../domain/interface/sub-district.interface";
import { SubDistrict } from "./entities/sub-district.entity";

@Injectable()
export class SubDistrictRepository extends BaseDataRepository<ISubDistrict> {
  tableName: string = TABLE_NAME.SUB_DISTRICT;
  relations: string[] = ["district"];

  constructor(
    @InjectRepository(SubDistrict)
    public repository: Repository<ISubDistrict>,
  ) {
    super(repository);
  }
}