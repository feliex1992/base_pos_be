import { ConsoleLogger, Injectable } from '@nestjs/common';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { IBatchResult } from 'src/base/interface/batch-result.interface';
import { UserRepository } from 'src/modules/user/data/user.repository';
import { Connection } from 'typeorm';
import { CreateUserCategoryDto } from '../controller/dto/create-user-category.dto';
import { UpdateUserCategoryDto } from '../controller/dto/update-user-category.dto';
import { UserCategoryGetManyDto } from '../controller/dto/user-category-get-many.dto';
import { UserCategoryRepository } from '../data/user-category.repository';
import { IUserCategory } from './interface/user-category.interface';
import { UserCategoryCreate } from './use-case/user-category.create';
import { UserCategoryDelete } from './use-case/user-category.delete';
import { UserCategoryGetMany } from './use-case/user-category.get-many';
import { UserCategoryUpdate } from './use-case/user-category.update';

@Injectable()
export class UserCategoryService {
  constructor(
    private connection: Connection,
    private userCategoryRepository: UserCategoryRepository,
    private userRepository: UserRepository,
  ) {}

  async create(createUserCategoryDto: CreateUserCategoryDto): Promise<IUserCategory> {
    const userCategoryCreate = new UserCategoryCreate(
      this.connection,
      this.userCategoryRepository,
      createUserCategoryDto,
    )
    await userCategoryCreate.execute();
    return userCategoryCreate.getResult();
  }

  async getMany(params: UserCategoryGetManyDto): Promise<Pagination<IUserCategory, IPaginationMeta>> {
    const userCategoryGetMany = new UserCategoryGetMany(
      this.userCategoryRepository,
      params,
    )
    await userCategoryGetMany.execute();
    return userCategoryGetMany.getResult();
  }

  async update(dataId: string, updateUserCategoryDto: UpdateUserCategoryDto): Promise<IUserCategory> {
    const userCategoryUpdate = new UserCategoryUpdate(
      this.connection,
      this.userCategoryRepository,
      dataId,
      updateUserCategoryDto
    );
    await userCategoryUpdate.execute();
    return userCategoryUpdate.getResult();
  }

  async delete(id: string): Promise<IBatchResult> {
    const userCategoryDelete = new UserCategoryDelete(
      this.connection,
      this.userCategoryRepository,
      id,
      this.userRepository,
    );
    await userCategoryDelete.execute();
    return userCategoryDelete.getResult();
  }
}
