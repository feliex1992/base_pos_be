import { TABLE_NAME } from "src/base/base-constant";
import { BaseEntity } from "src/base/entities/base.entity";
import { Supplier } from "src/modules/supplier/data/entities/supplier.entity";
import { ISupplier } from "src/modules/supplier/domain/interface/supplier.interface";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { IPurchaseDetail } from "../../domain/interface/purchase-detail.interface";
import { IPurchase } from "../../domain/interface/purchase.interface";
import { PurchaseDetail } from "./purchase-detail.entity";

@Entity(TABLE_NAME.PURCHASE)
export class Purchase extends BaseEntity implements IPurchase{
  @Column("uuid", { nullable: false })
  supplier_id?: string;

  @ManyToOne(() => Supplier, (supplier) => supplier)
  @JoinColumn({ name: "supplier_id" })
	supplier?: ISupplier;

  @Column('varchar', { length: 10, nullable: true })
	purchase_date?: string;

  @Column('varchar', { length: 30, nullable: false })
	no_invoice?: string;

  @Column('varchar', { length: 30, nullable: true })
	no_invoice_ext?: string;
  
  @OneToMany(() => PurchaseDetail, (purchaseDetail) => purchaseDetail.purchase_head, {
    cascade: ['insert', 'update', 'soft-remove']
  })
  detail?: IPurchaseDetail[];

  @Column('decimal', { nullable: false, default: 0 })
	total_price_item?: number;

  @Column('decimal', { nullable: false, default: 0 })
	total_disc_item?: number;

  @Column('decimal', { nullable: false, default: 0 })
	grand_price_item?: number;

  @Column('decimal', { nullable: false, default: 0 })
	disc_invoice?: number;

  @Column('decimal', { nullable: false, default: 0 })
	grand_price_invoice?: number;

  @Column('decimal', { nullable: false, default: 0 })
	grand_price_invoice_ext?: number;
}
