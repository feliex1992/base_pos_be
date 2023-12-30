import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TABLE_NAME } from "src/base/base-constant";
import { BaseDataRepository } from "src/base/base-data.repository";
import { Repository } from "typeorm";
import { IUserCategory } from "../domain/interface/user-category.interface";
import { UserCategory } from "./entities/user-category.entity";

@Injectable()
export class UserCategoryRepository extends BaseDataRepository<IUserCategory> {
  tableName: string = TABLE_NAME.USER_CATEGORY;
  relations: string[] = ["created_by", "updated_by"];

  constructor(
    @InjectRepository(UserCategory)
    public repository: Repository<IUserCategory>,
  ) {
    super(repository);
  }
}