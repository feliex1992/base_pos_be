import { IDistrict } from "./district.interface";

export interface ISubDistrict {
  id?: string;
  name: string;
  district_id?: string;
  district?: IDistrict;
}