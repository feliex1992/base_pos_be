import { TABLE_NAME } from "src/base/base-constant";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IDistrict } from "../../domain/interface/district.interface";
import { ISubDistrict } from "../../domain/interface/sub-district.interface";
import { District } from "./district.entity";

@Entity(TABLE_NAME.SUB_DISTRICT)
export class SubDistrict implements ISubDistrict {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { length: 100, nullable: false })
  name: string;

  @Column('uuid', { nullable: false })
  district_id?: string;

  @ManyToOne(() => District, (district) => district)
  @JoinColumn({ name: 'district_id' })
  district?: IDistrict;
}