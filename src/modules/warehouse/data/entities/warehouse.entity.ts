import { TABLE_NAME } from "src/base/base-constant";
import { BaseEntity } from "src/base/entities/base.entity";
import { Column, Entity } from "typeorm";
import { IWarehouse } from "../../domain/interface/warehouse.interface";

@Entity(TABLE_NAME.WAREHOUSE)
export class Warehouse extends BaseEntity implements IWarehouse{
  @Column('varchar', {
    length: 100,
    nullable: false,
    unique: true,
  })
  code: string;

  @Column('varchar', { length: 100, nullable: false })
  description: string;

  @Column('boolean', { nullable: false, default: false })
  status_transaction: boolean;
}
