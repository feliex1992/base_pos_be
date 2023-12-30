import { TABLE_NAME } from "src/base/base-constant";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IDistrict } from "../../domain/interface/district.interface";
import { IProvince } from "../../domain/interface/province.interface";
import { Province } from "./province.entity";

@Entity(TABLE_NAME.DISTRICT)
export class District implements IDistrict {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { length: 100, nullable: false })
  name: string;

  @Column('uuid', { nullable: false })
  province_id?: string;

  @ManyToOne(() => Province, (province) => province)
  @JoinColumn({ name: 'province_id' })
  province?: IProvince;
}