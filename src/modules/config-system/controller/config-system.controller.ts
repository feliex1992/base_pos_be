import { Controller, Get, Body, UseGuards, Put, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/base/auth/jwt-auth.guard';
import { MODULE_NAME } from 'src/base/base-constant';
import { ConfigSystemService } from '../domain/config-system.service';
import { UpdateConfigSystemDto } from './dto/update-config-system.dto';
import { ConfigSystemTransformer } from './transformer/config-system.transformer';

@Controller(MODULE_NAME.CONFIG_SYSTEM)
@ApiTags(MODULE_NAME.CONFIG_SYSTEM)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
export class ConfigSystemController {
  transformer = new ConfigSystemTransformer();

  constructor(private readonly service: ConfigSystemService) {}

  @Get()
  async getConfigSystem() {
    try {
      return this.transformer.transform(
        await this.service.getOne()
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Put()
  async updateConfigSystem(@Body() updateDto: UpdateConfigSystemDto) {
    try {
      return this.transformer.transform(
        await this.service.update(updateDto)
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
