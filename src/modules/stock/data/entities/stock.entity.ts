import { TABLE_NAME } from "src/base/base-constant";
import { Product } from "src/modules/product/data/entities/product.entity";
import { IProduct } from "src/modules/product/domain/interface/product.interface";
import { Warehouse } from "src/modules/warehouse/data/entities/warehouse.entity";
import { IWarehouse } from "src/modules/warehouse/domain/interface/warehouse.interface";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IStock } from "../../domain/interface/stock.interface";

@Entity(TABLE_NAME.STOCK)
export class Stock implements IStock {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

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

  @Column('decimal', { nullable: false, default: 0 })
	stock?: number;
}