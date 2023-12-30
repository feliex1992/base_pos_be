import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { IBatchResult } from 'src/base/interface/batch-result.interface';
import { UserCategoryRepository } from 'src/modules/user-category/data/user-category.repository';
import { Connection } from 'typeorm';
import { CreateUserDto } from '../controller/dto/create-user.dto';
import { LoginDto } from '../controller/dto/login.dto';
import { UpdateUserDto } from '../controller/dto/update-user.dto';
import { UserGetManyDto } from '../controller/dto/user-get-many.dto';
import { UserRepository } from '../data/user.repository';
import { IUserLogin } from './interface/user-login.interface';
import { IUser } from './interface/user.interface';
import { UserCreate } from './use-case/user.create';
import { UserDelete } from './use-case/user.delete';
import { UserGetMany } from './use-case/user.get-many';
import { UserLogin } from './use-case/user.login';
import { UserUpdate } from './use-case/user.update';

@Injectable()
export class UserService {
  constructor(
    private connection: Connection,
    public jwtService: JwtService,
    private userRepository: UserRepository,
    private userCategoryRepository: UserCategoryRepository,
  ) {}

  async login(loginDto: LoginDto): Promise<IUserLogin> {
    const userLogin = new UserLogin(
      this.userRepository,
      this.jwtService,
      loginDto,
    )
    await userLogin.execute();
    return userLogin.getResultLogin();
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const userCreate = new UserCreate(
      this.connection,
      this.userRepository,
      this.userCategoryRepository,
      createUserDto,
    )
    await userCreate.execute();
    return userCreate.getResult();
  }

  async getMany(params: UserGetManyDto): Promise<Pagination<IUser, IPaginationMeta>> {
    const userGetMany = new UserGetMany(
      this.userRepository,
      params,
    )
    await userGetMany.execute();
    return userGetMany.getResult();
  }

  async update(dataId: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const userUpdate = new UserUpdate(
      this.connection,
      this.userRepository,
      dataId,
      updateUserDto,
      this.userCategoryRepository,
    );
    await userUpdate.execute();
    const result = userUpdate.getResult();
    return result;
  }

  async delete(id: string): Promise<IBatchResult> {
    const userDelete = new UserDelete(
      this.connection,
      this.userRepository,
      id,
    );
    await userDelete.execute();
    return userDelete.getResult();
  }
}
