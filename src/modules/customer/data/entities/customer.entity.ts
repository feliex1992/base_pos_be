import { TABLE_NAME } from "src/base/base-constant";
import { BaseEntity } from "src/base/entities/base.entity";
import { SubDistrict } from "src/modules/area/data/entities/sub-district.entity";
import { Village } from "src/modules/area/data/entities/village.entity";
import { ISubDistrict } from "src/modules/area/domain/interface/sub-district.interface";
import { IVillage } from "src/modules/area/domain/interface/village.interface";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ICustomer } from "../../domain/interface/customer.interface";

@Entity(TABLE_NAME.CUSTOMER)
export class Customer extends BaseEntity implements ICustomer {
  @Column('varchar', {
    length: 100,
    nullable: false,
    unique: true,
  })
  code: string;

  @Column('varchar', { length: 100, nullable: false })
  name: string;

  @Column('varchar', { length: 100, nullable: false })
  nik: string;

  @Column('varchar', { length: 100, nullable: false })
	place_birth: string;

  @Column('varchar', { length: 10, nullable: false })
	date_birth: string;

  @Column('varchar', { length: 150, nullable: true })
  street: string;

  @Column('uuid', { nullable: true })
  village_id: string;

  @ManyToOne(() => Village, (village) => village)
  @JoinColumn({ name: 'village_id' })
	village: IVillage;

  @Column('varchar', { length: 100, nullable: true })
  religion: string;

  @Column('varchar', { length: 100, nullable: true })
	martial_status: string;

  @Column('varchar', { length: 100, nullable: true })
	job: string;

  @Column('varchar', { length: 100, nullable: true })
  contact: string;

  @Column('varchar', { length: 100, nullable: true })
  email: string;
}
