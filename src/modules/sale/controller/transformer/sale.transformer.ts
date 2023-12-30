import { BaseTransformer } from "src/base/base.transformer";
import { ICustomer } from "src/modules/customer/domain/interface/customer.interface";
import { ISaleDetail } from "../../domain/interface/sale-detail.interface";
import { ISale } from "../../domain/interface/sale.interface";

export class SaleTransformer extends BaseTransformer<ISale> {
  process(entity: ISale): ISale {
    const customer: ICustomer = {
      id: entity.customer.id,
      code: entity.customer.code,
      name: entity.customer.name,
    };

    let detail: ISaleDetail[] = null;
    for (let i in entity.detail) {
      const e: ISaleDetail = entity.detail[i];
      if (detail == null) detail = [];
      detail.push({
        id: e.id,
        no_queue: e.no_queue,
        product: {
          id: e.product.id,
          code: e.product.code,
          description: e.product.description
        },
        unit_retail: {
          id: e.unit_retail.id,
          code: e.unit_retail.code,
          description: e.unit_retail.description
        },
        unit_pack: {
          id: e.unit_pack.id,
          code: e.unit_pack.code,
          description: e.unit_pack.description
        },
        unit_pack_content: e.unit_pack_content,
        price_retail: e.price_retail,
        price_pack: e.price_pack,
        sell_price_item: e.sell_price_item,
        qty_pack: e.qty_pack,
        qty_retail: e.qty_retail,
        qty_total: e.qty_total,
        total_sell_price: e.total_sell_price,
        total_sell_disc: e.total_sell_disc,
        total_price_disc: e.total_price_disc,
        total_buy_price: e.total_buy_price,
      })
    }
      
    return {
      id: entity.id,
      customer: customer,
      sale_date: entity.sale_date,
      no_invoice: entity.no_invoice,
      detail: detail,
      total_disc_item: entity.total_disc_item,
      total_price_item: entity.total_price_item,
      grand_price_item: entity.grand_price_item,
      disc_invoice: entity.disc_invoice,
      grand_price_invoice: entity.grand_price_invoice,
      grand_buy_price: entity.grand_buy_price,
      cash_payment: entity.cash_payment,
      non_cash_payment: entity.non_cash_payment,
      change: entity.change,
      rounding: entity.rounding,
    };
  }
}