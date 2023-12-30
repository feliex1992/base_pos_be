import { TABLE_NAME } from "src/base/base-constant";
import { BaseEntity } from "src/base/entities/base.entity";
import { Column, Entity } from "typeorm";
import { IUom } from "../../domain/interface/uom.interface";

@Entity(TABLE_NAME.UOM)
export class Uom extends BaseEntity implements IUom{
  @Column('varchar', {
    length: 100,
    nullable: false,
    unique: true,
  })
  code: string;

  @Column('varchar', { length: 100, nullable: false })
  description: string;
}
