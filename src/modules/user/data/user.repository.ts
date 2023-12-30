import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TABLE_NAME } from "src/base/base-constant";
import { BaseDataRepository } from "src/base/base-data.repository";
import { Repository } from "typeorm";
import { IUser } from "../domain/interface/user.interface";
import { User } from "./entities/user.entity";

@Injectable()
export class UserRepository extends BaseDataRepository<IUser> {
  tableName: string = TABLE_NAME.USER;
  relations: string[] = ["user_category", "created_by", "updated_by"];

  constructor(
    @InjectRepository(User)
    public repository: Repository<IUser>,
  ) {
    super(repository);
  }
}