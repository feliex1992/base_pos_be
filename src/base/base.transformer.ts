import * as moment from 'moment';
import { BaseFooterEntity } from './entities/base-footer.entity';

export abstract class BaseTransformer<Entity> {
  entity: Entity | Entity[];
  withFooterInfo: boolean = true;

  transform(entity: Entity | Entity[]) {
    this.entity = entity;
    let objResult;
    if (Array.isArray(this.entity)) {
      objResult = [];
      this.entity.map((entity) => {
        objResult.push(Object.assign(
          this.process(entity),
          this.withFooterInfo ? this.transformFooterInfo(entity) : {},
        ));
      });
    } else {
      if (!!this.entity) {
        objResult = Object.assign(
          this.process(this.entity),
          this.withFooterInfo ? this.transformFooterInfo(this.entity) : {},
        );
      }
    }

    return objResult;
  }

  abstract process(entity: Entity): Entity;

  transformFooterInfo(footerInfo: BaseFooterEntity): BaseFooterEntity {
    const createdDate = moment(footerInfo.created_date).toISOString(true);
    const updatedDate = moment(footerInfo.updated_date).toISOString(true);
    const createdBy = (footerInfo.created_by === undefined ? null : footerInfo.created_by === null ? null : {
      id: footerInfo.created_by.id,
      user_id: footerInfo.created_by.user_id,
      user_name: footerInfo.created_by.user_name,
    });
    const updatedBy = (footerInfo.updated_by === undefined ? null : footerInfo.updated_by === null ? null : {
      id: footerInfo.updated_by.id,
      user_id: footerInfo.updated_by.user_id,
      user_name: footerInfo.updated_by.user_name,
    });
    return {
      created_by: createdBy,
      created_date: createdDate,
      updated_by: updatedBy,
      updated_date: updatedDate,
    };
  }
}
