import { TABLE_NAME } from "src/base/base-constant";
import { BaseEntity } from "src/base/entities/base.entity";
import { Column, Entity } from "typeorm";
import { ISupplier } from "../../domain/interface/supplier.interface";

@Entity(TABLE_NAME.SUPPLIER)
export class Supplier extends BaseEntity implements ISupplier {
  @Column('varchar', {
    length: 100,
    nullable: false,
    unique: true,
  })
  code: string;

  @Column('varchar', { length: 100, nullable: false })
  description: string;

  @Column('varchar', { length: 255, nullable: true })
  address: string;

  @Column('varchar', { length: 100, nullable: true })
  contact: string;

  @Column('varchar', { length: 100, nullable: true })
  email: string;
}
