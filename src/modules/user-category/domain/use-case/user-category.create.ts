import { BaseCreateUseCase } from 'src/base/use-cases/process/base-create.use-case';
import { Connection } from 'typeorm';
import { UserCategory } from '../../data/entities/user-category.entity';
import { UserCategoryRepository } from '../../data/user-category.repository';
import { validateDataUserCategory } from '../helpers/validate-user-category';
import { IUserCategory } from '../interface/user-category.interface';

export class UserCategoryCreate extends BaseCreateUseCase<IUserCategory> {
  constructor(
    connection: Connection,
    private userCategoryRepository: UserCategoryRepository,
    private userCategoryEntity: IUserCategory,
  ) {
    super(connection, userCategoryRepository, UserCategory, userCategoryEntity);
  }

  async beforeProcess(): Promise<void> {
    await validateDataUserCategory(
      this.userCategoryRepository,
      undefined,
      this.userCategoryEntity,
    );
  }
}
