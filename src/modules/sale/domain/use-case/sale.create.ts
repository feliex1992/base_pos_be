import { STOCK_CHANGE_CATEGORY } from "src/base/base-constant";
import { updateStock, stockFifoReduction } from "src/base/helpers/stock";
import { BaseCreateUseCase } from "src/base/use-cases/process/base-create.use-case";
import { CustomerRepository } from "src/modules/customer/data/customer.repository";
import { ProductRepository } from "src/modules/product/data/product.repository";
import { StockCardRepository } from "src/modules/stock/data/stock-card.repository";
import { StockFifoRepository } from "src/modules/stock/data/stock-fifo.repository";
import { StockRepository } from "src/modules/stock/data/stock.repository";
import { UomRepository } from "src/modules/uom/data/uom.repository";
import { WarehouseRepository } from "src/modules/warehouse/data/warehouse.repository";
import { IWarehouse } from "src/modules/warehouse/domain/interface/warehouse.interface";
import { Connection } from "typeorm";
import { Sale } from "../../data/entities/sale.entity";
import { SaleRepository } from "../../data/sale.repository";
import { saleGenerateNoInvoice } from "../helpers/sale-generate-no-invoice";
import { validateSale } from "../helpers/validate-sale";
import { ISaleDetail } from "../interface/sale-detail.interface";
import { ISale } from "../interface/sale.interface";

export class SaleCreate extends BaseCreateUseCase<ISale> {
  noInvoice: string;

  constructor(
    private saleConn: Connection,
    private saleRepository: SaleRepository,
    private sale: ISale,
    private customerRepository: CustomerRepository,
    private productRepository: ProductRepository,
    private uomRepository: UomRepository,
    private stockRepository: StockRepository,
    private stockCardRepository: StockCardRepository, 
    private stockFifoRepository: StockFifoRepository,
    private warehouseRepository: WarehouseRepository,
  ) {
    super(saleConn, saleRepository, Sale, sale);
  }

  async beforeProcess(): Promise<void> {
    const warehouseSale: IWarehouse = await this.warehouseRepository.getOne({
      where: {status_transaction: true}
    });
    if (!warehouseSale) throw new Error('Gudang transaksi tidak di temukan!');

    this.sale.no_invoice = await saleGenerateNoInvoice(
      this.saleRepository,
      this.sale.sale_date,
    );

    await validateSale(
      this.sale,
      this.customerRepository,
      this.productRepository,
      this.uomRepository,
    )

    for (let i in this.sale.detail) {
      const detail: ISaleDetail = this.sale.detail[i];

      await updateStock({
        createdId: !this.user?.id ? null : this.user.id,
        queryRunner: this.queryRunner,
        stockRepository: this.stockRepository,
        stockCardRepository: this.stockCardRepository,
        isAdd: false,
        productId: detail.product.id,
        warehouseId: warehouseSale.id,
        category: STOCK_CHANGE_CATEGORY.SALE,
        description: `Sale: ${this.sale.no_invoice}`,
        qty: detail.qty_total,
      });

      this.sale.detail[i].total_buy_price = await stockFifoReduction({
        queryRunner: this.queryRunner,
        stockFifoRepository: this.stockFifoRepository,
        productId: detail.product.id,
        qty: detail.qty_total,
        lastBuyPrice: detail.product.last_buy_price,
      })
    }

    return;
  }

  async afterProcess(): Promise<void> {
    return;
  }
}