import { BaseGetManyUseCase } from "src/base/use-cases/process/base-get-many.use-case";
import { UserCategoryGetManyDto } from "../../controller/dto/user-category-get-many.dto";
import { UserCategoryRepository } from "../../data/user-category.repository";
import { IUserCategory } from "../interface/user-category.interface";

export class UserCategoryGetMany extends BaseGetManyUseCase<IUserCategory> {
  constructor(
    public userCategoryRepository: UserCategoryRepository,
    public userCategoryGetManyDto: UserCategoryGetManyDto,
  ) {
    super(userCategoryRepository, userCategoryGetManyDto);
  }

  beforeProcess(): Promise<void> {
    return;
  }

  setFilterSearch(): string[] {
    return [`${this.table_name}.code`, `${this.table_name}.description`];
  }

  afterProcess(): Promise<void> {
    return;
  }
}