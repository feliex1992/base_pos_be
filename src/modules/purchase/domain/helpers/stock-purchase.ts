import { STOCK_CHANGE_CATEGORY } from "src/base/base-constant";
import { updateStock } from "src/base/helpers/stock";
import { IUserSingleton } from "src/base/singleton";
import { Product } from "src/modules/product/data/entities/product.entity";
import { ProductRepository } from "src/modules/product/data/product.repository";
import { IProduct } from "src/modules/product/domain/interface/product.interface";
import { StockCard } from "src/modules/stock/data/entities/stock-card.entity";
import { StockFifo } from "src/modules/stock/data/entities/stock-fifo.entity";
import { Stock } from "src/modules/stock/data/entities/stock.entity";
import { StockCardRepository } from "src/modules/stock/data/stock-card.repository";
import { StockFifoRepository } from "src/modules/stock/data/stock-fifo.repository";
import { StockRepository } from "src/modules/stock/data/stock.repository";
import { IStockCard } from "src/modules/stock/domain/interface/stock-card.interface";
import { IStockFifo } from "src/modules/stock/domain/interface/stock-fifo.interface";
import { QueryRunner } from "typeorm";

interface IStockPurchase {
  user: IUserSingleton;
  productRepository: ProductRepository;
  stockRepository: StockRepository;
  stockCardRepository: StockCardRepository;
  stockFifoRepository: StockFifoRepository;
  queryRunner: QueryRunner;
  category: STOCK_CHANGE_CATEGORY;
  description: string;
  product: IProduct;
  warehouseId: string;
  qty: number;
  buy_price: number;
}

export async function stockPurchase(stockPurchaseOption: IStockPurchase) {
  const {
    user,
    productRepository,
    stockRepository,
    stockCardRepository,
    stockFifoRepository,
    queryRunner,
    category,
    description,
    product,
    warehouseId,
    qty,
    buy_price,
  } = stockPurchaseOption;

  const createdId = !user?.id ? null : user.id;
  const stockFifo: IStockFifo = {
    product_id: product.id,
    stock_add: qty,
    stock_out: 0,
    stock_end: qty,
    buy_price: buy_price,
    created_id: createdId,
  }

  await updateStock({
    createdId: createdId,
    queryRunner: queryRunner,
    stockRepository: stockRepository,
    stockCardRepository: stockCardRepository,
    isAdd: true,
    productId: product.id,
    warehouseId: warehouseId,
    category: category,
    description: description,
    qty: qty,
  })

  await stockFifoRepository.createData(
    queryRunner,
    StockFifo,
    stockFifo,
  )
  await productRepository.updateDataById(
    queryRunner,
    Product,
    product.id,
    {
      code: product.code,
      description: product.description,
      last_buy_price: buy_price
    }
  )
}