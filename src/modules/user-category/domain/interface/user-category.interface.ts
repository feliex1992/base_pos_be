import { IBase } from 'src/base/interface/base.interface';

export interface IUserCategory extends IBase {
  code: string;
	description: string;
  privilege?: boolean;
  list_menu?: string[];
}
