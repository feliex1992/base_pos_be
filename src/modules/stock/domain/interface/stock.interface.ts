import { IProduct } from "src/modules/product/domain/interface/product.interface";
import { IWarehouse } from "src/modules/warehouse/domain/interface/warehouse.interface";

export interface IStock {
  id?: string;
	product_id?: string;
  product?: IProduct;
	warehouse_id?: string;
  warehouse?: IWarehouse;
	stock?: number;
}