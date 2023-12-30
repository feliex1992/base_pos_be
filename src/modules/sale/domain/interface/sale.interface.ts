import { IBase } from "src/base/interface/base.interface";
import { ICustomer } from "src/modules/customer/domain/interface/customer.interface";
import { ISaleDetail } from "./sale-detail.interface";

export interface ISale extends IBase {
  customer_id?: string;
	customer?: ICustomer;
	sale_date?: string;
	no_invoice?: string;
  detail?: ISaleDetail[];
	total_price_item?: number;
	total_disc_item?: number;
	grand_price_item?: number;
	disc_invoice?: number;
	grand_price_invoice?: number;
	grand_buy_price?: number;
	cash_payment?: number;
	non_cash_payment?: number;
	change?: number;
	rounding?: number;
}