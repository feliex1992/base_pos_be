import { BaseTransformer } from 'src/base/base.transformer';
import { IUserCategory } from 'src/modules/user-category/domain/interface/user-category.interface';
import { IUser } from '../../domain/interface/user.interface';

export class UserTransformer extends BaseTransformer<IUser> {
  process(entity: IUser): IUser {
    let userCategory: IUserCategory = null;

    if (entity.user_category) {
      userCategory = {
        id: entity.user_category.id,
        code: entity.user_category.code,
        description: entity.user_category.description,
      };
    }

    return {
      id: entity.id,
      user_id: entity.user_id,
      user_name: entity.user_name,
      avatar: entity.avatar,
      email: entity.email,
      address: entity.address,
      contact: entity.contact,
      user_category: userCategory,
    };
  }
}
