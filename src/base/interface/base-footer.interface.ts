import { IUser } from "src/modules/user/domain/interface/user.interface";

export interface IBaseFooter {
  created_id?: string;
  created_by?: IUser;
  created_date?: string;
  updated_id?: string;
  updated_by?: IUser;
  updated_date?: string;
}
