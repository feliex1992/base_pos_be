import { BaseDeleteUseCase } from "src/base/use-cases/process/base-delete.use-case";
import { UserRepository } from "src/modules/user/data/user.repository";
import { Connection } from "typeorm";
import { UserCategory } from "../../data/entities/user-category.entity";
import { UserCategoryRepository } from "../../data/user-category.repository";
import { IUserCategory } from "../interface/user-category.interface";

export class UserCategoryDelete extends BaseDeleteUseCase<IUserCategory> {
  constructor(
    private userCategoryConn: Connection,
    private userCategoryRepository: UserCategoryRepository,
    private dataId: string,
    private userRepository: UserRepository,
  ) {
    super(userCategoryConn, userCategoryRepository, UserCategory, dataId);
  }

  async validateProcess(): Promise<void> {
    const cekUser = await this.userRepository.getOne({
      where: {user_category_id: this.dataId}
    })
    if (cekUser) {
      throw new Error("Kategori user masih digunakan di data user!");
    }
    return;
  }
  beforeProcess(): Promise<void> {
    return;
  }
  afterProcess(): Promise<void> {
    return;
  }
}