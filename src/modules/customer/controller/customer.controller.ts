import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/base/auth/jwt-auth.guard';
import { MODULE_NAME } from 'src/base/base-constant';
import { CustomerService } from '../domain/customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerFilterDto } from './dto/customer-filter.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerTransformer } from './transformer/customer.transformer';

@Controller(MODULE_NAME.CUSTOMER)
@ApiTags(MODULE_NAME.CUSTOMER)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
export class CustomerController {
  transformer = new CustomerTransformer();

  constructor(private readonly service: CustomerService) {}

  @Post()
  async create(@Body() createDto: CreateCustomerDto) {
    try {
      return this.transformer.transform(
        await this.service.create(createDto)
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  async getMany(@Query() params: CustomerFilterDto) {
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
  // async update(@Param('id') id: string, @Body() updateDto: UpdateSupplierDto) {
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
