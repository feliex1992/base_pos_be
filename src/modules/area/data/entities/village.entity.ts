import { TABLE_NAME } from "src/base/base-constant";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ISubDistrict } from "../../domain/interface/sub-district.interface";
import { IVillage } from "../../domain/interface/village.interface";
import { SubDistrict } from "./sub-district.entity";

@Entity(TABLE_NAME.VILLAGE)
export class Village implements IVillage {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { length: 100, nullable: false })
  name: string;

  @Column('uuid', { nullable: false })
  sub_district_id?: string;

  @ManyToOne(() => SubDistrict, (subDistrict) => subDistrict)
  @JoinColumn({ name: 'sub_district_id' })
  sub_district?: ISubDistrict;
}