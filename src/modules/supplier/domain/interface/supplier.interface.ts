import { IBase } from "src/base/interface/base.interface";

export interface ISupplier extends IBase {
  code: string;
	description: string;
	address?: string;
	contact?: string;
	email?: string;
}