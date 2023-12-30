import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TABLE_NAME } from "src/base/base-constant";
import { BaseDataRepository } from "src/base/base-data.repository";
import { Repository } from "typeorm";
import { ICustomer } from "../domain/interface/customer.interface";
import { Customer } from "./entities/customer.entity";

@Injectable()
export class CustomerRepository extends BaseDataRepository<ICustomer> {
  tableName: string = TABLE_NAME.CUSTOMER;
  relations: string[] = [
    "village",
    "village.sub_district",
    "village.sub_district.district",
    "village.sub_district.district.province",
    "created_by",
    "updated_by",
  ];

  constructor(
    @InjectRepository(Customer)
    public repository: Repository<ICustomer>,
  ) {
    super(repository);
  }
}