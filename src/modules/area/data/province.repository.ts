import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TABLE_NAME } from "src/base/base-constant";
import { BaseDataRepository } from "src/base/base-data.repository";
import { Repository } from "typeorm";
import { IProvince } from "../domain/interface/province.interface";
import { Province } from "./entities/province.entity";

@Injectable()
export class ProvinceRepository extends BaseDataRepository<IProvince> {
  tableName: string = TABLE_NAME.PROVINCE;
  relations: string[] = [];

  constructor(
    @InjectRepository(Province)
    public repository: Repository<IProvince>,
  ) {
    super(repository);
  }
}