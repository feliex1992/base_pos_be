import { STOCK_CHANGE_CATEGORY } from "src/base/base-constant";
import { BaseCreateUseCase } from "src/base/use-cases/process/base-create.use-case";
import { ConfigSystemRepository } from "src/modules/config-system/data/config-system.repository";
import { ProductRepository } from "src/modules/product/data/product.repository";
import { StockCardRepository } from "src/modules/stock/data/stock-card.repository";
import { StockFifoRepository } from "src/modules/stock/data/stock-fifo.repository";
import { StockRepository } from "src/modules/stock/data/stock.repository";
import { SupplierRepository } from "src/modules/supplier/data/supplier.repository";
import { UomRepository } from "src/modules/uom/data/uom.repository";
import { WarehouseRepository } from "src/modules/warehouse/data/warehouse.repository";
import { IWarehouse } from "src/modules/warehouse/domain/interface/warehouse.interface";
import { Connection, IsNull, Not } from "typeorm";
import { Purchase } from "../../data/entities/purchase.entity";
import { PurchaseRepository } from "../../data/purchase.repository";
import { generateNoInvoice } from "../helpers/generate-no-invoice";
import { stockPurchase } from "../helpers/stock-purchase";
import { validatePurchase } from "../helpers/validate-purchase";
import { IPurchase } from "../interface/purchase.interface";

export class PurchaseCreate extends BaseCreateUseCase<IPurchase> {
  noInvoice: string;
  warehousePurchase: IWarehouse;

  constructor(
    private purchaseConn: Connection,
    private purchaseRepository: PurchaseRepository,
    private purchase: IPurchase,
    private supplierRepository: SupplierRepository,
    private productRepository: ProductRepository,
    private uomRepository: UomRepository,
    private stockRepository: StockRepository,
    private stockCardRepository: StockCardRepository, 
    private stockFifoRepository: StockFifoRepository,
    private configSystemRepository: ConfigSystemRepository,
    private warehouseRepository: WarehouseRepository,
  ) {
    super(purchaseConn, purchaseRepository, Purchase, purchase);
  }

  async beforeProcess(): Promise<void> {
    this.entity.no_invoice = await generateNoInvoice(
      this.purchaseRepository,
      this.purchase.purchase_date,
    );
    const cekSystem = await this.configSystemRepository.getOne({
      where: {id: Not(IsNull())}
    });
    if (!cekSystem) throw new Error("Configurasi system tidak di temukan!");
    this.warehousePurchase = cekSystem.warehouse_purchase;

    await validatePurchase(
      this.purchaseRepository,
      undefined,
      this.purchase,
      this.supplierRepository,
      this.productRepository,
      this.uomRepository,
      this.warehouseRepository,
      this.warehousePurchase,
    )
    return;
  }

  async afterProcess(): Promise<void> {
    for (let i in this.purchase.detail) {
      const detail = this.purchase.detail[i];

      await stockPurchase({
        user: this.user,
        productRepository: this.productRepository,
        stockRepository: this.stockRepository,
        stockCardRepository: this.stockCardRepository,
        stockFifoRepository: this.stockFifoRepository,
        queryRunner: this.queryRunner,
        category: STOCK_CHANGE_CATEGORY.PURCHASE,
        description: `Purchase: ${this.noInvoice}`,
        product: detail.product,
        warehouseId: this.warehousePurchase.id,
        qty: detail.qty_total,
        buy_price: detail.buy_price_item,
      })
    }
    return;
  }
}