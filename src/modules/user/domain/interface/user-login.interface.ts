import { IUser } from "./user.interface";

export interface IUserLogin {
  token?: string;
  user?: IUser;
}
