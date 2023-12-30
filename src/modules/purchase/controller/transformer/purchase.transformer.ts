import { BaseTransformer } from "src/base/base.transformer";
import { IPurchase } from "../../domain/interface/purchase.interface";
import { ISupplier } from "../../../supplier/domain/interface/supplier.interface";
import { IPurchaseDetail } from "../../domain/interface/purchase-detail.interface";
import { IProduct } from "src/modules/product/domain/interface/product.interface";
import { IUom } from "src/modules/uom/domain/interface/uom.interface";

export class PurchaseTransformer extends BaseTransformer<IPurchase> {
  process(entity: IPurchase): IPurchase {
    const supplier: ISupplier = (entity.supplier) ? {
      id: entity.supplier.id,
      code: entity.supplier.code,
      description: entity.supplier.description
    } : null;

    let purchaseDetail: IPurchaseDetail[] = entity.detail;
    if (entity.detail) {
      purchaseDetail = entity.detail.map((e) => {
        const product: IProduct = {
          id: e.product.id,
          code: e.product.code,
          description: e.product.description
        };

        const unitBuy: IUom = {
          id: e.unit_buy.id,
          code: e.unit_buy.code,
          description: e.unit_buy.description
        };

        const unitRetail: IUom = {
          id: e.unit_retail.id,
          code: e.unit_retail.code,
          description: e.unit_retail.description
        }

        return {
          id: e.id,
          no_queue: e.no_queue,
          product: product,
          unit_buy: unitBuy,
          unit_retail: unitRetail,
          unit_buy_content: e.unit_buy_content,
          buy_price_item: e.buy_price_item,
          qty_pak: e.qty_pak,
          qty_retail: e.qty_retail,
          qty_total: e.qty_total,
          total_price_item: e.total_price_item,
          total_disc_item: e.total_disc_item,
          total_price_disc: e.total_price_disc
        }
      });
    }

    return {
      id: entity.id,
      supplier: supplier,
      purchase_date: entity.purchase_date,
      no_invoice: entity.no_invoice,
      no_invoice_ext: entity.no_invoice_ext,
      detail: purchaseDetail,
      total_price_item: entity.total_price_item,
      total_disc_item: entity.total_disc_item,
      grand_price_item: entity.grand_price_item,
      disc_invoice: entity.disc_invoice,
      grand_price_invoice: entity.grand_price_invoice,
      grand_price_invoice_ext: entity.grand_price_invoice_ext
    };
  }
}