import { TABLE_NAME } from "src/base/base-constant";
import { BaseEntity } from "src/base/entities/base.entity";
import { Customer } from "src/modules/customer/data/entities/customer.entity";
import { ICustomer } from "src/modules/customer/domain/interface/customer.interface";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ISaleDetail } from "../../domain/interface/sale-detail.interface";
import { ISale } from "../../domain/interface/sale.interface";
import { SaleDetail } from "./sale-detail.entity";

@Entity(TABLE_NAME.SALE)
export class Sale extends BaseEntity implements ISale{
  @Column("uuid", { nullable: false })
  customer_id?: string;

  @ManyToOne(() => Customer, (customer) => customer)
  @JoinColumn({ name: "customer_id" })
	customer?: ICustomer;

  @Column('varchar', { length: 10, nullable: true })
	sale_date?: string;

  @Column('varchar', { length: 30, nullable: false })
	no_invoice: string;

  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.sale_head, {
    cascade: ['insert', 'update', 'soft-remove']
  })
  detail?: ISaleDetail[];

  @Column('decimal', { nullable: false, default: 0 })
	total_price_item: number;

  @Column('decimal', { nullable: false, default: 0 })
	total_disc_item: number;

  @Column('decimal', { nullable: false, default: 0 })
	grand_price_item: number;

  @Column('decimal', { nullable: false, default: 0 })
	disc_invoice: number;

  @Column('decimal', { nullable: false, default: 0 })
	grand_price_invoice: number;

  @Column('decimal', { nullable: false, default: 0 })
	grand_buy_price: number;

  @Column('decimal', { nullable: false, default: 0 })
  cash_payment: number;

  @Column('decimal', { nullable: false, default: 0 })
	non_cash_payment: number;

  @Column('decimal', { nullable: false, default: 0 })
	change: number;

  @Column('decimal', { nullable: false, default: 0 })
	rounding: number;
}
