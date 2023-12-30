import { Controller, Get, Post, Body, Param, Delete, UseGuards, BadRequestException, Query, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/base/auth/jwt-auth.guard';
import { MODULE_NAME } from 'src/base/base-constant';
import { ProductService } from '../domain/product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductGetManyDto } from './dto/product-get-many.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductTransformer } from './transformer/product.transformer';

@Controller(MODULE_NAME.PRODUCT)
@ApiTags(MODULE_NAME.PRODUCT)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
export class ProductController {
  transformer = new ProductTransformer();

  constructor(private readonly service: ProductService) {}

  @Post()
  async create(@Body() createDto: CreateProductDto) {
    try {
      return this.transformer.transform(
        await this.service.create(createDto)
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  async getMany(@Query() params: ProductGetManyDto) {
    try {
      const result = await this.service.getMany(params);
      const transformResult = {
        data: this.transformer.transform(result['items'])
      };
      transformResult['meta'] = result['meta'];
      return transformResult;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get('last-code')
  async getLastCode() {
    try {
      return await this.service.getLastCode();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateProductDto) {
    try {
      return this.transformer.transform(
        await this.service.update(id, updateDto)
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.service.delete(id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
