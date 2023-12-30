import { TABLE_NAME } from "src/base/base-constant";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IProductCode } from "../../domain/interface/product-code.interface";

@Entity(TABLE_NAME.TP_PRODUCT_CODE)
export class ProductCode implements IProductCode {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', {
    length: 100,
    nullable: false,
    unique: true,
  })
  code: string;
}
