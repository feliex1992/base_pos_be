import { BaseTransformer } from 'src/base/base.transformer';
import { IUserCategory } from 'src/modules/user-category/domain/interface/user-category.interface';

export class UserCategoryTransformer extends BaseTransformer<IUserCategory> {
  process(entity: IUserCategory): IUserCategory {
    return {
      id: entity.id,
      code: entity.code,
      description: entity.description,
      privilege: entity.privilege,
      list_menu: entity.list_menu,
    };
  }
}
