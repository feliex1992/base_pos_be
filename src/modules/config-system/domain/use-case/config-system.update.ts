import { BaseCreateUseCase } from "src/base/use-cases/process/base-create.use-case";
import { WarehouseRepository } from "src/modules/warehouse/data/warehouse.repository";
import { Connection, IsNull, Not } from "typeorm";
import { ConfigSystemRepository } from "../../data/config-system.repository";
import { ConfigSystem } from "../../data/entities/config-system.entity";
import { validateConfigSystem } from "../helpers/validate-config-system";
import { IConfigSystem } from "../interface/config-system.interface";

export class ConfigSystemUpdate extends BaseCreateUseCase<IConfigSystem> {
  constructor(
    private configSystemConn: Connection,
    private configSystemRepository: ConfigSystemRepository,
    private configSystem: IConfigSystem,
    private warehouseRepository: WarehouseRepository,
  ) {
    super(configSystemConn, configSystemRepository, ConfigSystem, configSystem);
  }

  async beforeProcess(): Promise<void> {
    await validateConfigSystem(
      this.warehouseRepository,
      this.configSystem
    )
    return;
  }

  async process(): Promise<void> {
    const cekConfigSystem = await this.configSystemRepository.getOne({
      where: { id: Not(IsNull()) },
    });

    if (cekConfigSystem) {
      this.result = await this.configSystemRepository.updateDataById(
        this.queryRunner,
        ConfigSystem,
        cekConfigSystem.id,
        this.configSystem,
      );
    } else {
      this.result = await this.configSystemRepository.createData(
        this.queryRunner,
        ConfigSystem,
        this.configSystem,
      );
    }
  }

  afterProcess(): Promise<void> {
    return;
  }
}
