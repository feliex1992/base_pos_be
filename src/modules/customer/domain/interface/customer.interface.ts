import { IBase } from "src/base/interface/base.interface";
import { IVillage } from "src/modules/area/domain/interface/village.interface";

export interface ICustomer extends IBase {
  code?: string;
	name: string;
	nik?: string;
	place_birth?: string;
	date_birth?: string;
	street?: string;
	village_id?: string;
	village?: IVillage;
	religion?: string;
	martial_status?: string;
	job?: string;
	contact?: string;
	email?: string;
}