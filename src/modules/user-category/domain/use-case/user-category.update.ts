import { BaseUpdateUseCase } from "src/base/use-cases/process/base-update.use-case";
import { Connection } from "typeorm";
import { UserCategory } from "../../data/entities/user-category.entity";
import { UserCategoryRepository } from "../../data/user-category.repository";
import { validateDataUserCategory } from "../helpers/validate-user-category";
import { IUserCategory } from "../interface/user-category.interface";

export class UserCategoryUpdate extends BaseUpdateUseCase<IUserCategory> {
  constructor(
    private userCategoryConn: Connection,
    private userCategoryRepository: UserCategoryRepository,
    private dataId: string,
    private userCategory: IUserCategory,
  ) {
    super(userCategoryConn, userCategoryRepository, UserCategory, dataId, userCategory);
  }

  async beforeProcess(): Promise<void> {
    await validateDataUserCategory(
      this.userCategoryRepository,
      this.dataId,
      this.userCategory,
    );
  }

  afterProcess(): Promise<void> {
    return;
  }
}