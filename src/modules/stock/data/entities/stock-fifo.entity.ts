import { TABLE_NAME } from "src/base/base-constant";
import { BaseEntity } from "src/base/entities/base.entity";
import { Product } from "src/modules/product/data/entities/product.entity";
import { IProduct } from "src/modules/product/domain/interface/product.interface";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { IStockFifo } from "../../domain/interface/stock-fifo.interface";

@Entity(TABLE_NAME.STOCK_FIFO)
export class StockFifo extends BaseEntity implements IStockFifo{
  @Column("uuid", { nullable: false })
  product_id?: string;

  @ManyToOne(() => Product, (product) => product)
  @JoinColumn({ name: "product_id" })
  product?: IProduct;

  @Column('decimal', { nullable: false, default: 0 })
	stock_add?: number;

  @Column('decimal', { nullable: false, default: 0 })
	stock_out?: number;

  @Column('decimal', { nullable: false, default: 0 })
	stock_end?: number;

  @Column('decimal', { nullable: false, default: 0 })
	buy_price?: number;
}