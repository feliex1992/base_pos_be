import { Controller, Get, Post, Body, Param, Delete, UseGuards, BadRequestException, Query, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/base/auth/jwt-auth.guard';
import { MODULE_NAME } from 'src/base/base-constant';
import { ProductTypeService } from '../domain/product-type.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { ProductTypeGetManyDto } from './dto/product-type-get-many.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductTypeTransformer } from './transformers/product-type.transformer';

@Controller(MODULE_NAME.PRODUCT_TYPE)
@ApiTags(MODULE_NAME.PRODUCT_TYPE)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
export class ProductTypeController {
  transformer = new ProductTypeTransformer();

  constructor(private readonly productTypeService: ProductTypeService) {}

  @Post()
  async create(@Body() createProductTypeDto: CreateProductTypeDto) {
    try {
      return this.transformer.transform(
        await this.productTypeService.create(createProductTypeDto)
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  async getMany(@Query() params: ProductTypeGetManyDto) {
    try {
      const result = await this.productTypeService.getMany(params);
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
  async update(@Param('id') id: string, @Body() updateProductTypeDto: UpdateProductTypeDto) {
    try {
      return this.transformer.transform(
        await this.productTypeService.update(id, updateProductTypeDto)
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.productTypeService.delete(id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
