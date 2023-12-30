import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/base/auth/jwt-auth.guard";
import { MODULE_NAME } from "src/base/base-constant";
import { UomService } from "../domain/uom.service";
import { CreateUomDto } from "./dto/create-uom.dto";
import { UomGetManyDto } from "./dto/uom-get-many.dto";
import { UpdateUomDto } from "./dto/update-uom.dto";
import { UomTransformer } from "./transformers/uom.transformer";

@Controller(MODULE_NAME.UOM)
@ApiTags(MODULE_NAME.UOM)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
export class UomController {
  transformer = new UomTransformer();

  constructor(private readonly uomService: UomService) {}

  @Post()
  async create(@Body() createUomDto: CreateUomDto) {
    try {
      return this.transformer.transform(
        await this.uomService.create(createUomDto)
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  async getMany(@Query() params: UomGetManyDto) {
    try {
      const result = await this.uomService.getMany(params);
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
  async update(@Param('id') id: string, @Body() updateUomDto: UpdateUomDto) {
    try {
      return this.transformer.transform(
        await this.uomService.update(id, updateUomDto)
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.uomService.delete(id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
