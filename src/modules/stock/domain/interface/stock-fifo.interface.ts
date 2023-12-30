import { IBase } from "src/base/interface/base.interface";
import { IProduct } from "src/modules/product/domain/interface/product.interface";

export interface IStockFifo extends IBase {
  product_id?: string;
  product?: IProduct;
  stock_add?: number;
  stock_out?: number;
  stock_end?: number;
  buy_price?: number;
}
