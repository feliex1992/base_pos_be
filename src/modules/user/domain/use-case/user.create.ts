import { BaseCreateUseCase } from "src/base/use-cases/process/base-create.use-case";
import { UserCategoryRepository } from "src/modules/user-category/data/user-category.repository";
import { Connection } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "../../data/entities/user.entity";
import { UserRepository } from "../../data/user.repository";
import { validateDataUser } from "../helpers/validate-user";
import { IUser } from "../interface/user.interface";

export class UserCreate extends BaseCreateUseCase<IUser> {
  constructor(
    connection: Connection,
    private userRepository: UserRepository,
    private userCategoryRepository: UserCategoryRepository,
    private userEntity: IUser,
  ) {
    super(connection, userRepository, User, userEntity);
  }

  async beforeProcess(): Promise<void> {
    if (this.userEntity.retype_password !== this.userEntity.password) {
      throw new Error("Password dan retype password tidak sama!");
    }

    await validateDataUser(
      this.userRepository,
      this.userCategoryRepository,
      undefined,
      this.userEntity,
    );
    
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.userEntity.password, salt);

    this.userEntity.password = hash;
    this.userEntity.salt = salt;
  }
}
