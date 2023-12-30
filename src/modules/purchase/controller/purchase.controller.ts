import { Controller, Get, Post, Body, UseGuards, BadRequestException, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/base/auth/jwt-auth.guard';
import { MODULE_NAME } from 'src/base/base-constant';
import { PurchaseService } from '../domain/purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseGetManyDto } from './dto/purchase-get-many.dto';
import { PurchaseTransformer } from './transformer/purchase.transformer';

@Controller(MODULE_NAME.PURCHASE)
@ApiTags(MODULE_NAME.PURCHASE)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
export class PurchaseController {
  transformer = new PurchaseTransformer();

  constructor(private readonly service: PurchaseService) {}

  @Post()
  async create(@Body() createDto: CreatePurchaseDto) {
    try {
      return this.transformer.transform(
        await this.service.create(createDto)
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  async getMany(@Query() params: PurchaseGetManyDto) {
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

  // @Put(':id')
  // async update(@Param('id') id: string, @Body() updateDto: UpdatePurchaseDto) {
  //   try {
  //     return this.transformer.transform(
  //       await this.service.update(id, updateDto)
  //     );
  //   } catch (err) {
  //     throw new BadRequestException(err.message);
  //   }
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   try {
  //     return await this.service.delete(id);
  //   } catch (err) {
  //     throw new BadRequestException(err.message);
  //   }
  // }
}
