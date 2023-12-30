import { IProduct } from "src/modules/product/domain/interface/product.interface";
import { IUom } from "src/modules/uom/domain/interface/uom.interface";

export interface IPurchaseDetail {
  id?: string;
	purchase_head_id?: string;
	no_queue?: number;
	product_id?: string;
  product?: IProduct;
	unit_buy_id?: string;
	unit_buy?: IUom;
	unit_retail_id?: string;
	unit_retail?: IUom;
	unit_buy_content?: number;
	buy_price_item?: number;
	qty_pak?: number;
	qty_retail?: number;
	qty_total?: number;
	total_price_item?: number;
	total_disc_item?: number;
	total_price_disc?: number;
}