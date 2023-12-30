import { Controller, Get, Post, Body, Param, Delete, UseGuards, BadRequestException, Query, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/base/auth/jwt-auth.guard';
import { MODULE_NAME } from 'src/base/base-constant';
import { UserCategoryService } from '../domain/user-category.service';
import { CreateUserCategoryDto } from './dto/create-user-category.dto';
import { UpdateUserCategoryDto } from './dto/update-user-category.dto';
import { UserCategoryGetManyDto } from './dto/user-category-get-many.dto';
import { UserCategoryTransformer } from './transformers/user-category.transformer';

@Controller(MODULE_NAME.USER_CATEGORY)
@ApiTags(MODULE_NAME.USER_CATEGORY)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
export class UserCategoryController {
  transformer = new UserCategoryTransformer();
  constructor(private readonly userCategoryService: UserCategoryService) {}

  @Post()
  async create(@Body() createUserCategoryDto: CreateUserCategoryDto) {
    try {
      return this.transformer.transform(
        await this.userCategoryService.create(createUserCategoryDto)
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  async getMany(@Query() params: UserCategoryGetManyDto) {
    try {
      const result = await this.userCategoryService.getMany(params);
      const transformResult = {
        data: this.transformer.transform(result['items'])
      };
      transformResult['meta'] = result['meta'];
      return transformResult;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserCategoryDto: UpdateUserCategoryDto) {
    try {
      return this.transformer.transform(
        await this.userCategoryService.update(id, updateUserCategoryDto)
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.userCategoryService.delete(id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
