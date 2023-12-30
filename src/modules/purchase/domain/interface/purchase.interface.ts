import { IBase } from "src/base/interface/base.interface";
import { ISupplier } from "src/modules/supplier/domain/interface/supplier.interface";
import { IPurchaseDetail } from "./purchase-detail.interface";

export interface IPurchase extends IBase {
  supplier_id?: string;
	supplier?: ISupplier;
	purchase_date?: string;
	no_invoice?: string;
	no_invoice_ext?: string;
  detail?: IPurchaseDetail[];
	total_price_item?: number;
	total_disc_item?: number;
	grand_price_item?: number;
	disc_invoice?: number;
	grand_price_invoice?: number;
	grand_price_invoice_ext?: number;
}