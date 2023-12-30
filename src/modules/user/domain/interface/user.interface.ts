import { IBase } from 'src/base/interface/base.interface';
import { IUserCategory } from 'src/modules/user-category/domain/interface/user-category.interface';

export interface IUser extends IBase {
  user_id: string;
  user_name: string;
  avatar?: string;
  email?: string;
  address?: string,
  contact?: string,
  password?: string;
  retype_password?: string;
  salt?: string;
  user_category_id?: string;
  user_category?: IUserCategory;
}
