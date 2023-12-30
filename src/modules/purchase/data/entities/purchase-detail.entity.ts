import { TABLE_NAME } from "src/base/base-constant";
import { Product } from "src/modules/product/data/entities/product.entity";
import { IProduct } from "src/modules/product/domain/interface/product.interface";
import { Uom } from "src/modules/uom/data/entities/uom.entity";
import { IUom } from "src/modules/uom/domain/interface/uom.interface";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IPurchaseDetail } from "../../domain/interface/purchase-detail.interface";
import { IPurchase } from "../../domain/interface/purchase.interface";
import { Purchase } from "./purchase.entity";

@Entity(TABLE_NAME.PURCHASE_DETAIL)
export class PurchaseDetail implements IPurchaseDetail{
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column("uuid", { nullable: false })
	purchase_head_id?: string;

  @ManyToOne(
    () => Purchase,
    (purchase) => purchase.detail
  )
  @JoinColumn({ name: 'purchase_head_id' })
  purchase_head?: IPurchase;

  @Column("int", {nullable: true })
	no_queue?: number;

  @Column("uuid", { nullable: false })
	product_id?: string;

  @ManyToOne(() => Product, (product) => product)
  @JoinColumn({ name: "product_id" })
  product?: IProduct;

  @Column("uuid", { nullable: true })
	unit_buy_id?: string;

  @ManyToOne(() => Uom, (uom) => uom)
  @JoinColumn({ name: "unit_buy_id" })
	unit_buy?: IUom;

  @Column("uuid", { nullable: true })
	unit_retail_id?: string;

  @ManyToOne(() => Uom, (uom) => uom)
  @JoinColumn({ name: "unit_retail_id" })
	unit_retail?: IUom;
	
  @Column('decimal', { nullable: false, default: 0 })
  unit_buy_content?: number;

  @Column('decimal', { nullable: false, default: 0 })
	buy_price_item?: number;

  @Column('decimal', { nullable: false, default: 0 })
	qty_pak?: number;

  @Column('decimal', { nullable: false, default: 0 })
	qty_retail?: number;

  @Column('decimal', { nullable: false, default: 0 })
	qty_total?: number;

  @Column('decimal', { nullable: false, default: 0 })
	total_price_item?: number;

  @Column('decimal', { nullable: false, default: 0 })
	total_disc_item?: number;

  @Column('decimal', { nullable: false, default: 0 })
	total_price_disc?: number;
}