import { TABLE_NAME } from "src/base/base-constant";
import { Product } from "src/modules/product/data/entities/product.entity";
import { IProduct } from "src/modules/product/domain/interface/product.interface";
import { Uom } from "src/modules/uom/data/entities/uom.entity";
import { IUom } from "src/modules/uom/domain/interface/uom.interface";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ISaleDetail } from "../../domain/interface/sale-detail.interface";
import { ISale } from "../../domain/interface/sale.interface";
import { Sale } from "./sale.entity";

@Entity(TABLE_NAME.SALE_DETAIL)
export class SaleDetail implements ISaleDetail{
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column("uuid", { nullable: false })
  sale_head_id?: string;

  @ManyToOne(
    () => Sale,
    (sale) => sale.detail
  )
  @JoinColumn({ name: 'sale_head_id' })
  sale_head?: ISale;

  @Column("int", {nullable: true })
	no_queue?: number;

  @Column("uuid", { nullable: false })
	product_id?: string;

  @ManyToOne(() => Product, (product) => product)
  @JoinColumn({ name: "product_id" })
  product?: IProduct;

  @Column("uuid", { nullable: false })
	unit_retail_id?: string;

  @ManyToOne(() => Uom, (uom) => uom)
  @JoinColumn({ name: "unit_retail_id" })
  unit_retail?: IUom;

  @Column("uuid", { nullable: false })
	unit_pack_id?: string;

  @ManyToOne(() => Uom, (uom) => uom)
  @JoinColumn({ name: "unit_pack_id" })
  unit_pack?: IUom;

  @Column('decimal', { nullable: false, default: 0 })
	unit_pack_content?: number;

  @Column('decimal', { nullable: false, default: 0 })
	price_retail?: number;

  @Column('decimal', { nullable: false, default: 0 })
	price_pack?: number;

  @Column('decimal', { nullable: false, default: 0 })
	sell_price_item?: number;

  @Column('decimal', { nullable: false, default: 0 })
	qty_pack?: number;

  @Column('decimal', { nullable: false, default: 0 })
	qty_retail?: number;

  @Column('decimal', { nullable: false, default: 0 })
	qty_total?: number;

  @Column('decimal', { nullable: false, default: 0 })
	total_sell_price?: number;

  @Column('decimal', { nullable: false, default: 0 })
	total_sell_disc?: number;

  @Column('decimal', { nullable: false, default: 0 })
	total_price_disc?: number;

  @Column('decimal', { nullable: false, default: 0 })
	total_buy_price?: number;
}