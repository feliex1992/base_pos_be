import { roundPrice } from "src/base/helpers/round-price";
import { CustomerRepository } from "src/modules/customer/data/customer.repository";
import { ProductRepository } from "src/modules/product/data/product.repository";
import { UomRepository } from "src/modules/uom/data/uom.repository";
import { ISale } from "../interface/sale.interface";


export async function validateSale(
  sale: ISale,
  customerRepository: CustomerRepository,
  productRepository: ProductRepository,
  uomRepository: UomRepository,
): Promise<void> {
  const cekCustomer = await customerRepository.getOne({
    where: {id: sale.customer.id}
  });
  if (!cekCustomer) throw new Error("Data customer tidak di temukan!");

  let totalPriceItem = 0;
  let totalDiscItem = 0;
  let grandPriceItem = 0;

  for (let i in sale.detail) {
    const detail = sale.detail[i];

    const cekProduct = await productRepository.getOne({
      where: {id: detail.product.id}
    });
    if (!cekProduct) throw new Error(`Data product: ${detail.product.description} tidak di temukan!`);
    detail.product.last_buy_price = cekProduct.last_buy_price;
    detail.price_pack = cekProduct.pack_sell_price;
    detail.price_retail = cekProduct.retail_sell_price;
    
    const cekUomRetail = await uomRepository.getOne({
      where: {id: detail.unit_retail.id}
    });
    if (!cekUomRetail) throw new Error(`Data satuan retail: ${detail.unit_retail.description} tidak di temukan!`);

    if (detail.unit_retail.id !== detail.unit_pack.id) {
      const cekUomPack = await uomRepository.getOne({
        where: {id: detail.unit_pack.id}
      });
      if (!cekUomPack) throw new Error(`Data satuan Pak: ${detail.unit_pack.description} tidak di temukan!`);
    } else {
      if (detail.unit_pack_content !== 1) throw new Error(`Isi satuan pak barang: ${detail.product.description} tidak valid!`);
    }

    if (detail.qty_total <= 0) throw new Error(`Qty total jual item: ${detail.product.description} tidak sesuai!`);
    if (detail.qty_total !== detail.qty_retail + (detail.qty_pack * detail.unit_pack_content)) {
      throw new Error(`Qty total jual item: ${detail.product.description} tidak sesuai!`);
    }

    if (detail.qty_retail !== 0) {
      if (detail.total_sell_price !== roundPrice(detail.qty_retail*detail.price_retail)) {
        throw new Error(`Total harga item: ${detail.product.description} tidak sesuai!`);
      }
      detail.sell_price_item = detail.price_retail;
    } else {
      if (detail.total_sell_price !== roundPrice(detail.qty_pack*detail.price_pack)) {
        throw new Error(`Total harga item: ${detail.product.description} tidak sesuai!`);
      }
      detail.sell_price_item = roundPrice(detail.total_sell_price/detail.qty_total);
    }

    if (detail.total_price_disc !== roundPrice(detail.total_sell_price-detail.total_sell_disc)) {
      throw new Error(`Total harga + disc item: ${detail.product.description} tidak sesuai!`);
    }

    totalPriceItem += detail.total_sell_price;
    totalDiscItem += detail.total_sell_disc;
    grandPriceItem += detail.total_price_disc;
  }

  if (totalPriceItem !== sale.total_price_item) throw new Error("Total keseluruhan harga item tidak sesuai!");
  if (totalDiscItem !== sale.total_disc_item) throw new Error("Total keseluruhan discount item tidak sesuai!");
  if (grandPriceItem !== sale.grand_price_item) throw new Error("Total harga+discount item tidak sesuai!");
  if (sale.grand_price_invoice !== roundPrice(sale.grand_price_item-sale.disc_invoice)) {
    throw new Error("Total harga+discount invoice tidak sesuai!");
  }

  if (sale.grand_price_invoice !== roundPrice(sale.cash_payment+sale.non_cash_payment)) {
    throw new Error("Total pembayaran tidak sesuai dengan total harga+discount!");
  }
}