import { BaseTransformer } from "src/base/base.transformer";
import { IProductType } from "src/modules/product-type/domain/interface/product-type.interface";
import { IUom } from "src/modules/uom/domain/interface/uom.interface";
import { IProduct } from "../../domain/interface/product.interface";

export class ProductTransformer extends BaseTransformer<IProduct> {
  process(entity: IProduct): IProduct {
    const productType: IProductType = (entity.product_type) ? {
      id: entity.product_type.id,
      code: entity.product_type.code,
      description: entity.product_type.description,
      product_category: (entity.product_type.product_category) ? {
        id: entity.product_type.product_category.id,
        code: entity.product_type.product_category.code,
        description: entity.product_type.product_category.description,
      } : null,
    } : null;

    const unitRetail: IUom = (entity.unit_retail) ? {
      id: entity.unit_retail.id,
      code: entity.unit_retail.code,
      description: entity.unit_retail.description,
    } : null;

    const unitPack: IUom = (entity.unit_pack) ? {
      id: entity.unit_pack.id,
      code: entity.unit_pack.code,
      description: entity.unit_pack.description,
    } : null;

    const unitBuy: IUom = (entity.unit_buy) ? {
      id: entity.unit_buy.id,
      code: entity.unit_buy.code,
      description: entity.unit_buy.description,
    } : null;

    return {
      id: entity.id,
      code: entity.code,
      description: entity.description,
      picture: entity.picture,
      product_type: productType,
      unit_retail: unitRetail,
      unit_pack: unitPack,
      unit_pack_content: entity.unit_pack_content,
      unit_buy: unitBuy,
      unit_buy_content: entity.unit_buy_content,
      last_buy_price: entity.last_buy_price,
      retail_sell_price: entity.retail_sell_price,
      retail_sell_disc: entity.retail_sell_disc,
      pack_sell_price: entity.pack_sell_price,
      pack_sell_disc: entity.pack_sell_disc,
    };
  }
}
