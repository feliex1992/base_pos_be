import { IBase } from "src/base/interface/base.interface";
import { IProductType } from "src/modules/product-type/domain/interface/product-type.interface";
import { IUom } from "src/modules/uom/domain/interface/uom.interface";

export interface IProduct extends IBase {
  code: string;
	description: string;
	picture?: string;
	product_type_id?: string;
	product_type?: IProductType;
	unit_retail_id?: string;
	unit_retail?: IUom;
	unit_pack_id?: string;
	unit_pack?: IUom;
	unit_pack_content?: number;
	unit_buy_id?: string;
	unit_buy?: IUom;
	unit_buy_content?: number;
	last_buy_price?: number;
	retail_sell_price?: number;
	retail_sell_disc?: number;
	pack_sell_price?: number;
	pack_sell_disc?: number;
}