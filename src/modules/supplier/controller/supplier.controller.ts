import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/base/auth/jwt-auth.guard";
import { MODULE_NAME } from "src/base/base-constant";
import { SupplierService } from "../domain/supplier.service";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { SupplierGetManyDto } from "./dto/supplier-get-many.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";
import { SupplierTransformer } from "./transformer/supplier.transformer";

@Controller(MODULE_NAME.SUPPLIER)
@ApiTags(MODULE_NAME.SUPPLIER)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
export class SupplierController {
  transformer = new SupplierTransformer();

  constructor(private readonly service: SupplierService) {}

  @Post()
  async create(@Body() createDto: CreateSupplierDto) {
    try {
      return this.transformer.transform(
        await this.service.create(createDto)
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  async getMany(@Query() params: SupplierGetManyDto) {
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

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateSupplierDto) {
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
