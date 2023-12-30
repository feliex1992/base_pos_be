import { Controller, Get, Post, Body, Param, Delete, UseGuards, BadRequestException, Query, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/base/auth/jwt-auth.guard';
import { MODULE_NAME } from 'src/base/base-constant';
import { WarehouseService } from '../domain/warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { WarehouseGetManyDto } from './dto/warehouse-get-many.dto';
import { WarehouseTransformer } from './transformers/warehouse.transformer';

@Controller(MODULE_NAME.WAREHOUSE)
@ApiTags(MODULE_NAME.WAREHOUSE)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
export class WarehouseController {
  transformer = new WarehouseTransformer();

  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  async create(@Body() createDto: CreateWarehouseDto) {
    try {
      return this.transformer.transform(
        await this.warehouseService.create(createDto)
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  async getMany(@Query() params: WarehouseGetManyDto) {
    try {
      const result = await this.warehouseService.getMany(params);
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
  async update(@Param('id') id: string, @Body() updateDto: UpdateWarehouseDto) {
    try {
      return this.transformer.transform(
        await this.warehouseService.update(id, updateDto)
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.warehouseService.delete(id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
