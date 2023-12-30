import { IBase } from "src/base/interface/base.interface";
import { IWarehouse } from "src/modules/warehouse/domain/interface/warehouse.interface";

export interface IConfigSystem extends IBase {
  warehouse_purchase_id?: string;
  warehouse_purchase?: IWarehouse;
}