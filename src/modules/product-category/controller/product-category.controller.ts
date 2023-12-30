import { Controller, Get, Post, Body, Param, Delete, UseGuards, BadRequestException, Query, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/base/auth/jwt-auth.guard';
import { MODULE_NAME } from 'src/base/base-constant';
import { ProductCategoryService } from '../domain/product-category.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { ProductCategoryGetManyDto } from './dto/product-category-get-many.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategoryTransformer } from './transformers/product-category.transformer';

@Controller(MODULE_NAME.PRODUCT_CATEGORY)
@ApiTags(MODULE_NAME.PRODUCT_CATEGORY)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
export class ProductCategoryController {
  transformer = new ProductCategoryTransformer();

  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Post()
  async create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    try {
      return this.transformer.transform(
        await this.productCategoryService.create(createProductCategoryDto)
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  async getMany(@Query() params: ProductCategoryGetManyDto) {
    try {
      const result = await this.productCategoryService.getMany(params);
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
  async update(@Param('id') id: string, @Body() updateProductCategoryDto: UpdateProductCategoryDto) {
    try {
      return this.transformer.transform(
        await this.productCategoryService.update(id, updateProductCategoryDto)
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.productCategoryService.delete(id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
