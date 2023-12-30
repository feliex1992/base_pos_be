import { Controller, Get, Post, Body, Param, Delete, BadRequestException, UseGuards, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/base/auth/jwt-auth.guard';
import { MODULE_NAME } from 'src/base/base-constant';
import { IUserLogin } from '../domain/interface/user-login.interface';
import { UserService } from '../domain/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGetManyDto } from './dto/user-get-many.dto';
import { UserLoginTransformer } from './transformers/user-login.transformer';
import { UserTransformer } from './transformers/user.transformer';

@ApiTags(MODULE_NAME.USER)
@Controller(MODULE_NAME.USER)
export class UserController {
  transformer = new UserTransformer();
  constructor(private readonly userService: UserService) {}

  @Get('test-api')
  async testApi() {
    return "hello this is service pos be, test update code."
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const result: IUserLogin = await this.userService.login(loginDto);
      const resTransform = new UserLoginTransformer().transform(result);
      return resTransform;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.transformer.transform(
        await this.userService.create(createUserDto)
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Get()
  async getMany(@Query() params: UserGetManyDto) {
    try {
      const result = await this.userService.getMany(params);
      const transformResult = {
        data: this.transformer.transform(result['items'])
      };
      transformResult['meta'] = result['meta'];
      return transformResult;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.transformer.transform(
        await this.userService.update(id, updateUserDto)
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.userService.delete(id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
