import { Injectable } from '@nestjs/common';
import { WarehouseRepository } from 'src/modules/warehouse/data/warehouse.repository';
import { Connection } from 'typeorm';
import { UpdateConfigSystemDto } from '../controller/dto/update-config-system.dto';
import { ConfigSystemRepository } from '../data/config-system.repository';
import { IConfigSystem } from './interface/config-system.interface';
import { ConfigSystemGetOne } from './use-case/config-system.get-one';
import { ConfigSystemUpdate } from './use-case/config-system.update';

@Injectable()
export class ConfigSystemService {
  constructor(
    private connection: Connection,
    private configSystemRepository: ConfigSystemRepository,
    private warehouseRepository: WarehouseRepository,
  ) {}

  async getOne(): Promise<IConfigSystem> {
    const configSystemGetOne = new ConfigSystemGetOne(
      this.configSystemRepository,
    )
    await configSystemGetOne.execute();
    return configSystemGetOne.getResult();
  }

  async update(updateDto: UpdateConfigSystemDto): Promise<IConfigSystem> {
    const configSystemUpdate = new ConfigSystemUpdate(
      this.connection,
      this.configSystemRepository,
      updateDto,
      this.warehouseRepository,
    );
    await configSystemUpdate.execute();
    return configSystemUpdate.getResult();
  }
}
