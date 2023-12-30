import { IPaginationMeta, Pagination } from "nestjs-typeorm-paginate";
import { StockCard } from "src/modules/stock/data/entities/stock-card.entity";
import { StockFifo } from "src/modules/stock/data/entities/stock-fifo.entity";
import { Stock } from "src/modules/stock/data/entities/stock.entity";
import { StockCardRepository } from "src/modules/stock/data/stock-card.repository";
import { StockFifoRepository } from "src/modules/stock/data/stock-fifo.repository";
import { StockRepository } from "src/modules/stock/data/stock.repository";
import { IStockCard } from "src/modules/stock/domain/interface/stock-card.interface";
import { IStockFifo } from "src/modules/stock/domain/interface/stock-fifo.interface";
import { QueryRunner } from "typeorm";
import { TABLE_NAME } from "../base-constant";
import { roundPrice } from "./round-price";

interface IUpdateStock {
  createdId: string,
  queryRunner: QueryRunner,
  stockRepository: StockRepository,
  stockCardRepository: StockCardRepository,
  isAdd: boolean,
  productId: string,
  warehouseId: string,
  category: string,
  description: string,
  qty: number,
}

export async function updateStock(params: IUpdateStock) {
  const {
    createdId,
    queryRunner,
    stockRepository,
    stockCardRepository,
    productId,
    warehouseId,
    isAdd,
    category,
    description,
    qty,
  } = params;

  let initStock = 0; 
  let finalStock = 0;
  let stockCard: IStockCard = {
    product_id: productId,
    warehouse_id: warehouseId,
    category_transaction: category,
    description: description,
  }

  const cekStock = await stockRepository.getOne({
    where: {product_id: productId, warehouse_id: warehouseId}
  });
  if (cekStock) {
    initStock = cekStock.stock;
    finalStock = isAdd ? Number(cekStock.stock) + qty : Number(cekStock.stock) - qty;
    await stockRepository.updateDataById(
      queryRunner,
      Stock,
      cekStock.id,
      {
        stock: finalStock
      },
    );
  } else {
    finalStock = isAdd ? qty : qty*-1;
    await stockRepository.createData(
      queryRunner,
      Stock,
      {
        product_id: productId,
        warehouse_id: warehouseId,
        stock: finalStock
      }
    );
  }
  stockCard.stock_start = initStock;
  if (isAdd) {
    stockCard.stock_add = qty;
    stockCard.stock_out = 0;
  } else {
    stockCard.stock_add = 0;
    stockCard.stock_out = qty;
  }
  stockCard.stock_end = finalStock;
  stockCard.created_id = createdId,

  await stockCardRepository.createData(
    queryRunner,
    StockCard,
    stockCard
  )
}

interface IStockFifoReduction {
  queryRunner: QueryRunner,
  stockFifoRepository: StockFifoRepository,
  productId: string,
  qty: number,
  lastBuyPrice: number,
}

export async function stockFifoReduction(
  params: IStockFifoReduction,
): Promise<number> {
  const {
    queryRunner,
    stockFifoRepository,
    productId,
    qty,
    lastBuyPrice,
  } = params;

  const repository = stockFifoRepository.getRepository();
  const queryBuilder = repository.createQueryBuilder(TABLE_NAME.STOCK_FIFO);

  queryBuilder.where(`${TABLE_NAME.STOCK_FIFO}.stock_end > 0`);
  queryBuilder.andWhere(`${TABLE_NAME.STOCK_FIFO}.product_id = '${productId}'`);
  queryBuilder.orderBy(`${TABLE_NAME.STOCK_FIFO}.created_date`, 'ASC');

  let statusLoop = true;
  let totalBuyPrice = 0;
  let qtyItem = qty;
  do {
    const paginateStockFifo: Pagination<IStockFifo, IPaginationMeta> = await stockFifoRepository.getMany(queryBuilder, {
      page: 1,
      limit: 10,
    });
    if (paginateStockFifo.items.length === 0) {
      totalBuyPrice += roundPrice(lastBuyPrice*qtyItem);
      statusLoop = false;
    } else {
      let statusLoop2 = true;
      let i = 0;
      do {
        if (i !== paginateStockFifo.items.length) {
          const stockFifo: IStockFifo = paginateStockFifo.items[i];

          if (stockFifo.stock_end >= qtyItem) {
            await stockFifoRepository.updateDataById(
              queryRunner,
              StockFifo,
              stockFifo.id,
              {
                stock_out: Number(stockFifo.stock_out) + qtyItem,
                stock_end: Number(stockFifo.stock_end) - qtyItem
              }
            )
            totalBuyPrice += roundPrice(Number(stockFifo.buy_price)*qtyItem);
            statusLoop = false;
            statusLoop2 = false;
          } else {
            await stockFifoRepository.updateDataById(
              queryRunner,
              StockFifo,
              stockFifo.id,
              {
                stock_out: Number(stockFifo.stock_out) + Number(stockFifo.stock_end),
                stock_end: Number(stockFifo.stock_end) - Number(stockFifo.stock_end)
              }
            )
            totalBuyPrice += roundPrice(Number(stockFifo.buy_price)*Number(stockFifo.stock_end));
            qtyItem -= stockFifo.stock_end;
          }
          i++;
        } else {
          statusLoop2 = false;
        }
      } while (statusLoop2);
    }
  } while(statusLoop);

  return totalBuyPrice;
}
