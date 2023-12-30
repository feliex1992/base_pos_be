import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/base/auth/jwt-auth.guard';
import { MODULE_NAME } from 'src/base/base-constant';
import { SaleService } from '../domain/sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SaleFilterDto } from './dto/sale-filter.dto';
import { SaleTransformer } from './transformer/sale.transformer';

@Controller(MODULE_NAME.SALE)
@ApiTags(MODULE_NAME.SALE)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
export class SaleController {
  transformer = new SaleTransformer();

  constructor(private readonly service: SaleService) {}

  @Post()
  async create(@Body() createDto: CreateSaleDto) {
    try {
      return this.transformer.transform(
        await this.service.create(createDto)
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  async getMany(@Query() params: SaleFilterDto) {
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
}
