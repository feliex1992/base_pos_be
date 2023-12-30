import { TABLE_NAME } from "src/base/base-constant";
import { BaseEntity } from "src/base/entities/base.entity";
import { ProductCategory } from "src/modules/product-category/data/entities/product-category.entity";
import { IProductCategory } from "src/modules/product-category/domain/interface/product-category.interface";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { IProductType } from "../../domain/interface/product-type.interface";

@Entity(TABLE_NAME.PRODUCT_TYPE)
export class ProductType extends BaseEntity implements IProductType{
  @Column('varchar', {
    length: 100,
    nullable: false,
    unique: true,
  })
  code: string;

  @Column('varchar', { length: 100, nullable: false })
  description: string;

  @Column('uuid', { nullable: true })
  product_category_id?: string;

  @ManyToOne(() => ProductCategory, (productCategory) => productCategory)
  @JoinColumn({ name: 'product_category_id' })
  product_category?: IProductCategory;
}
