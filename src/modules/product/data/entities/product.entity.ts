import { TABLE_NAME } from "src/base/base-constant";
import { BaseEntity } from "src/base/entities/base.entity";
import { ProductType } from "src/modules/product-type/data/entities/product-type.entity";
import { IProductType } from "src/modules/product-type/domain/interface/product-type.interface";
import { Uom } from "src/modules/uom/data/entities/uom.entity";
import { IUom } from "src/modules/uom/domain/interface/uom.interface";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { IProduct } from "../../domain/interface/product.interface";

@Entity(TABLE_NAME.PRODUCT)
export class Product extends BaseEntity implements IProduct {
  @Column('varchar', {
    length: 100,
    nullable: false,
    unique: true,
  })
  code: string;

  @Column('varchar', { length: 150, nullable: false })
  description: string;

  @Column('varchar', { length: 255, nullable: true })
  picture?: string;

  @Column('uuid', { nullable: true })
	product_type_id?: string;

  @ManyToOne(() => ProductType, (productType) => productType)
  @JoinColumn({ name: 'product_type_id' })
  product_type?: IProductType;

  @Column('uuid', { nullable: true })
	unit_retail_id?: string;

  @ManyToOne(() => Uom, (uom) => uom)
  @JoinColumn({ name: 'unit_retail_id' })
  unit_retail?: IUom;

  @Column('uuid', { nullable: true })
	unit_pack_id?: string;

  @ManyToOne(() => Uom, (uom) => uom)
  @JoinColumn({ name: 'unit_pack_id' })
  unit_pack?: IUom;

  @Column('decimal', { nullable: false, default: 0 })
	unit_pack_content?: number;

  @Column('uuid', { nullable: true })
	unit_buy_id?: string;

  @ManyToOne(() => Uom, (uom) => uom)
  @JoinColumn({ name: 'unit_buy_id' })
  unit_buy?: IUom;

  @Column('decimal', { nullable: false, default: 0 })
	unit_buy_content?: number;

  @Column('decimal', { nullable: false, default: 0 })
	last_buy_price?: number;

  @Column('decimal', { nullable: false, default: 0 })
	retail_sell_price?: number;

  @Column('decimal', { nullable: false, default: 0 })
	retail_sell_disc?: number;

  @Column('decimal', { nullable: false, default: 0 })
	pack_sell_price?: number;

  @Column('decimal', { nullable: false, default: 0 })
	pack_sell_disc?: number;
}
