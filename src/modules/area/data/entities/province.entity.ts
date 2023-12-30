import { TABLE_NAME } from "src/base/base-constant";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IProvince } from "../../domain/interface/province.interface";

@Entity(TABLE_NAME.PROVINCE)
export class Province implements IProvince {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { length: 100, nullable: false })
  name: string;
}
