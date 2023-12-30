import { TABLE_NAME } from "src/base/base-constant";
import { BaseEntity } from "src/base/entities/base.entity";
import { Warehouse } from "src/modules/warehouse/data/entities/warehouse.entity";
import { IWarehouse } from "src/modules/warehouse/domain/interface/warehouse.interface";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { IConfigSystem } from "../../domain/interface/config-system.interface";

@Entity(TABLE_NAME.CONFIG_SYSTEM)
export class ConfigSystem extends BaseEntity implements IConfigSystem{
  @Column("uuid", { nullable: false })
  warehouse_purchase_id?: string;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse)
  @JoinColumn({ name: "warehouse_purchase_id" })
  warehouse_purchase?: IWarehouse;
}
