import { ISubDistrict } from "./sub-district.interface";

export interface IVillage {
  id?: string;
  name: string;
  sub_district_id?: string;
  sub_district?: ISubDistrict;
}