import { BaseTransformer } from "src/base/base.transformer";
import { IUserLogin } from "../../domain/interface/user-login.interface";

export class UserLoginTransformer extends BaseTransformer<IUserLogin> {
  withFooterInfo: boolean = false;

  process(entity: IUserLogin): IUserLogin {
    return {
      token: entity.token,
      user: {
        id: entity.user.id,
        user_id: entity.user.user_id,
        user_name: entity.user.user_name,
        email: entity.user.email,
        address: entity.user.address,
        contact: entity.user.contact,
        user_category: {
          id: entity.user.user_category.id,
          code: entity.user.user_category.code,
          description: entity.user.user_category.description,
          privilege: entity.user.user_category.privilege,
          list_menu: entity.user.user_category.list_menu,
        }
      }
    };
  }
}
