import { TABLE_NAME } from "src/base/base-constant";
import { BaseEntity } from "src/base/entities/base.entity";
import { Warehouse } from "src/modules/warehouse/data/entities/warehouse.entity";
import { IWarehouse } from "src/modules/warehouse/domain/interface/warehouse.interface";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { IProduct } from "../../../product/domain/interface/product.interface";
import { IStockCard } from "../../domain/interface/stock-card.interface";
import { Product } from "../../../product/data/entities/product.entity";

@Entity(TABLE_NAME.STOCK_CARD)
export class StockCard extends BaseEntity implements IStockCard{
  @Column("uuid", { nullable: false })
  product_id?: string;

  @ManyToOne(() => Product, (product) => product)
  @JoinColumn({ name: "product_id" })
  product?: IProduct;

  @Column("uuid", { nullable: false })
	warehouse_id?: string;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse)
  @JoinColumn({ name: "warehouse_id" })
  warehouse?: IWarehouse;

  @Column('varchar', { length: 50, nullable: false })
	category_transaction?: string;

  @Column('varchar', { length: 100, nullable: false })
	description?: string;

  @Column('decimal', { nullable: false, default: 0 })
	stock_start?: number;

  @Column('decimal', { nullable: false, default: 0 })
	stock_add?: number;

  @Column('decimal', { nullable: false, default: 0 })
	stock_out?: number;

  @Column('decimal', { nullable: false, default: 0 })
	stock_end?: number;
}