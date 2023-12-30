import { IProvince } from "./province.interface";

export interface IDistrict {
  id?: string;
  name: string;
  province_id?: string;
  province?: IProvince;
}