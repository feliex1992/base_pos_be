import { RESPONSE_STATUS } from 'src/base/base-constant';
import { IBatchResult } from 'src/base/interface/batch-result.interface';
import { Connection, EntityTarget } from 'typeorm';
import { BaseDataRepository } from '../../base-data.repository';
import { BaseUseCase } from '../base.use-case';

export abstract class BaseDeleteUseCase<Entity> extends BaseUseCase<Entity> {
  result: IBatchResult;

  constructor(
    connection: Connection,
    private dataRepository: BaseDataRepository<Entity>,
    private entityTarget: EntityTarget<Entity>,
    private id: string,
  ) {
    super(connection);
  }

  async prepareData(): Promise<void> {
    return;
  }

  async process(): Promise<void> {
    await this.validateProcess();
    await this.dataRepository.deleteDataById(
      this.queryRunner,
      this.entityTarget,
      this.id,
    );
    this.result = {
      id: this.id,
      status: RESPONSE_STATUS.SUCCESS,
      message: 'Delete data success.',
    };
  }

  abstract validateProcess(): Promise<void>;

  getResult() {
    return this.result;
  }
}
