import { roundPrice } from "src/base/helpers/round-price";
import { ProductRepository } from "src/modules/product/data/product.repository";
import { SupplierRepository } from "src/modules/supplier/data/supplier.repository";
import { UomRepository } from "src/modules/uom/data/uom.repository";
import { WarehouseRepository } from "src/modules/warehouse/data/warehouse.repository";
import { IWarehouse } from "src/modules/warehouse/domain/interface/warehouse.interface";
import { PurchaseRepository } from "../../data/purchase.repository";
import { IPurchaseDetail } from "../interface/purchase-detail.interface";
import { IPurchase } from "../interface/purchase.interface";

export async function validatePurchase(
  purchaseRepository: PurchaseRepository,
  dataId: string,
  purchase: IPurchase,
  supplierRepository: SupplierRepository,
  productRepository: ProductRepository,
  uomRepository: UomRepository,
  warehouseRepository: WarehouseRepository,
  warehousePurchase: IWarehouse,
): Promise<void> {
  let totalPriceItem = 0;
  let totalDiscItem = 0;
  let grandPriceItem = 0;

  // validate warehouse purchase
  const cekWarehouse = await warehouseRepository.getOne({
    where: {id: warehousePurchase.id}
  })
  if (!cekWarehouse) throw new Error("Data gudang pembelian tidak di temukan!");
  
  // cek duplicate no invoice external
  if (purchase.no_invoice_ext !== null || purchase.no_invoice_ext !== "-") {
    const cekPurchase = await purchaseRepository.getOne({
      where: { no_invoice_ext: purchase.no_invoice_ext },
    });
  
    if (cekPurchase) {
      if (dataId) {
        if (dataId !== cekPurchase.id) throw new Error("No invoice external sudah digunakan!");
      } else {
        throw new Error("No invoice external sudah digunakan!");
      }
    }
  }

  // cek validate supplier
  const cekSupplier = await supplierRepository.getOne({
    where: {id: purchase.supplier.id}
  });
  if (!cekSupplier) throw new Error("Data supplier tidak di temukan!");

  // cek validate detail purchase
  for (let i in purchase.detail) {
    const detail: IPurchaseDetail = purchase.detail[i];

    // validate data product
    const cekProduct = await productRepository.getOne({
      where: {id: detail.product.id}
    });
    if (!cekProduct) throw new Error(`Data produk ${detail.product.description} tidak di temukan!`);

    // validate unit retail
    const cekUnitRetail = await uomRepository.getOne({
      where: {id: detail.unit_retail.id}
    });
    if (!cekUnitRetail) throw new Error(`Data satuan retail ${detail.unit_retail.code} tidak di temukan!`);

    // validate unit buy
    const cekUnitBuy = await uomRepository.getOne({
      where: {id: detail.unit_buy.id}
    });
    if (!cekUnitBuy) throw new Error(`Data satuan beli ${detail.unit_buy.code} tidak di temukan!`);

    // validate unit buy content
    if (detail.unit_retail.id === detail.unit_buy.id) {
      if (detail.unit_buy_content !== 1) throw new Error(`Isi satuan beli produk tidak valid!`);
    }

    // validate qty buy total
    if (detail.qty_total !== (detail.qty_pak * detail.unit_buy_content) + detail.qty_retail) {
      throw new Error(`Total qty: ${detail.product.description} tidak valid!`);
    }

    // validate item buy price
    if (detail.buy_price_item !== roundPrice(detail.total_price_item / detail.qty_total)) {
      throw new Error(`Harga beli produk: ${detail.product.description} tidak valid!`);
    }

    // validate total item buy price
    if (detail.total_price_disc !== roundPrice(detail.total_price_item - detail.total_disc_item)) {
      throw new Error(`Total harga beli produk: ${detail.product.description} tidak valid!`)
    }

    // count total detail for compare with header
    totalPriceItem += roundPrice(detail.total_price_item);
    totalDiscItem += roundPrice(detail.total_disc_item);
    grandPriceItem += roundPrice(detail.total_price_disc);
  }

  // validate total price header with detail
  if (purchase.total_price_item !== totalPriceItem) throw new Error("Total harga beli produk tidak valid!");
  if (purchase.total_disc_item !== totalDiscItem) throw new Error("Total discount beli produk tidak valid!");
  if (purchase.grand_price_item !== grandPriceItem) throw new Error("Grand price item tidak valid!");

  // validate grand price invoice
  if (purchase.grand_price_invoice !== roundPrice(purchase.grand_price_item - purchase.disc_invoice)) {
    throw new Error("Grand price invoice tidak valid!");
  }

  // validate difference grand price invoice with external
  if (Math.abs(purchase.grand_price_invoice - purchase.grand_price_invoice_ext) > 500) {
    throw new Error("Perbedaan perhitungan harga invoice system dengan external melebihi batas toleransi!");
  }
}