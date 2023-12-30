import { BaseUpdateUseCase } from "src/base/use-cases/process/base-update.use-case";
import { UserCategoryRepository } from "src/modules/user-category/data/user-category.repository";
import { Connection } from "typeorm";
import { User } from "../../data/entities/user.entity";
import { UserRepository } from "../../data/user.repository";
import { validateDataUser } from "../helpers/validate-user";
import { IUser } from "../interface/user.interface";

export class UserUpdate extends BaseUpdateUseCase<IUser> {
  constructor(
    private userConn: Connection,
    private userRepository: UserRepository,
    private dataId: string,
    private userEntity: IUser,
    private userCategoryRepository: UserCategoryRepository,
  ) {
    super(userConn, userRepository, User, dataId, userEntity);
  }

  async beforeProcess(): Promise<void> {
    await validateDataUser(
      this.userRepository,
      this.userCategoryRepository,
      this.dataId,
      this.userEntity,
    );
    return;
  }

  afterProcess(): Promise<void> {
    return;
  }
}