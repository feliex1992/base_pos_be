import { BaseDataRepository } from 'src/base/base-data.repository';
import { Connection, EntityTarget } from 'typeorm';
import { BaseUseCase } from '../base.use-case';

export abstract class BaseCreateUseCase<Entity> extends BaseUseCase<Entity> {
  result: Entity;

  constructor(
    connection: Connection,
    private dataRepository: BaseDataRepository<Entity>,
    private entityTarget: EntityTarget<Entity>,
    public entity: Entity,
  ) {
    super(connection);
  }

  async prepareData(): Promise<void> {
    Object.assign(this.entity, {
      created_id: !this.user?.id ? null : this.user.id,
      created_user: !this.user?.user_id ? null : this.user.user_id,
    });
  }

  async process(): Promise<void> {
    this.result = await this.dataRepository.createData(
      this.queryRunner,
      this.entityTarget,
      this.entity,
    );
  }

  async afterProcess(): Promise<void> {
    return;
  }

  async getResult(): Promise<Entity> {
    const result = await this.dataRepository.getOne({
      where: { id: this.result['id'] },
    });
    return result;
  }
}
