import { BaseGetOneUseCase } from "src/base/use-cases/process/base-get-one.use-case";
import { IsNull, Not } from "typeorm";
import { ConfigSystemRepository } from "../../data/config-system.repository";
import { IConfigSystem } from "../interface/config-system.interface";

export class ConfigSystemGetOne extends BaseGetOneUseCase<IConfigSystem> {
  constructor(
    private configSystemRepository: ConfigSystemRepository,
  ) {
    super(configSystemRepository);
  }

  beforeProcess(): Promise<void> {
    return;
  }

  async setFindProperties(): Promise<any> {
    return {
      where: {id: Not(IsNull())}
    };
  }
  
  afterProcess(): Promise<void> {
    return;
  }
}
