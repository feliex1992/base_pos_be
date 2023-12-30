import { TABLE_NAME } from 'src/base/base-constant';
import { BaseEntity } from 'src/base/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { IProductCategory } from '../../domain/interface/product-category.interface';

@Entity(TABLE_NAME.PRODUCT_CATEGORY)
export class ProductCategory extends BaseEntity implements IProductCategory {
  @Column('varchar', {
    length: 100,
    nullable: false,
    unique: true,
  })
  code: string;

  @Column('varchar', { length: 100, nullable: false })
  description: string;
}
