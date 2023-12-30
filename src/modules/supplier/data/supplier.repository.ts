import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TABLE_NAME } from "src/base/base-constant";
import { BaseDataRepository } from "src/base/base-data.repository";
import { Repository } from "typeorm";
import { ISupplier } from "../domain/interface/supplier.interface";
import { Supplier } from "./entities/supplier.entity";

@Injectable()
export class SupplierRepository extends BaseDataRepository<ISupplier> {
  tableName: string = TABLE_NAME.SUPPLIER;
  relations: string[] = ["created_by", "updated_by"];

  constructor(
    @InjectRepository(Supplier)
    public repository: Repository<ISupplier>,
  ) {
    super(repository);
  }
}