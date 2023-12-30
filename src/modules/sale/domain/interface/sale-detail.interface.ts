import { IProduct } from "src/modules/product/domain/interface/product.interface";
import { IUom } from "src/modules/uom/domain/interface/uom.interface";
import { ISale } from "./sale.interface";

export interface ISaleDetail {
  id?: string;
	sale_head_id?: string;
  sale_head?: ISale;
	no_queue?: number;
	product_id?: string;
  product?: IProduct;
	unit_retail_id?: string;
  unit_retail?: IUom;
	unit_pack_id?: string;
  unit_pack?: IUom;
	unit_pack_content?: number;
	price_retail?: number;
	price_pack?: number;
	sell_price_item?: number;
	qty_pack?: number;
	qty_retail?: number;
	qty_total?: number;
	total_sell_price?: number;
	total_sell_disc?: number;
	total_price_disc?: number;
	total_buy_price?: number;
}