import { IBase } from "src/base/interface/base.interface";

export interface IWarehouse extends IBase {
  code: string;
  description: string;
  status_transaction?: boolean;
}