import { IBase } from "src/base/interface/base.interface";
import { IWarehouse } from "src/modules/warehouse/domain/interface/warehouse.interface";
import { IProduct } from "../../../product/domain/interface/product.interface";

export interface IStockCard extends IBase {
  product_id?: string;
  product?: IProduct;
	warehouse_id?: string;
	warehouse?: IWarehouse;
	category_transaction?: string;
	description?: string;
	stock_start?: number;
	stock_add?: number;
	stock_out?: number;
	stock_end?: number;
}