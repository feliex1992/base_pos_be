import { TABLE_NAME } from "src/base/base-constant";
import { BaseGetManyUseCase } from "src/base/use-cases/process/base-get-many.use-case";
import { UserGetManyDto } from "../../controller/dto/user-get-many.dto";
import { UserRepository } from "../../data/user.repository";
import { IUser } from "../interface/user.interface";

export class UserGetMany extends BaseGetManyUseCase<IUser>{
  constructor(
    private userRepository: UserRepository,
    private userGetManyDto: UserGetManyDto,
  ) {
    super(userRepository, userGetManyDto);
  }

  beforeProcess(): Promise<void> {
    return;
  }
  
  setFilterSearch(): string[] {
    return [`${this.table_name}.user_id`, `${this.table_name}.user_name`, "user_category.code", "user_category.description"];
  }

  afterProcess(): Promise<void> {
    return;
  }
}