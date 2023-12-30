import { TABLE_NAME } from 'src/base/base-constant';
import { BaseEntity } from 'src/base/entities/base.entity';
import { User } from 'src/modules/user/data/entities/user.entity';
import { IUser } from 'src/modules/user/domain/interface/user.interface';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IUserCategory } from '../../domain/interface/user-category.interface';

@Entity(TABLE_NAME.USER_CATEGORY)
export class UserCategory implements IUserCategory {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', {
    length: 50,
    nullable: false,
    unique: true,
  })
  code: string;

  @Column('varchar', { length: 100, nullable: false })
  description: string;

  @Column('boolean', { nullable: false, default: false })
  privilege: boolean;

  @Column('varchar', { nullable: true, array: true })
  list_menu: string[];

  @Column('uuid', { name: 'created_id', nullable: true })
  created_id?: string;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'created_id' })
  created_by?: IUser;

  @CreateDateColumn({ type: 'timestamp' })
  created_date?: string;

  @Column('uuid', { name: 'updated_id', nullable: true })
  updated_id?: string;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'updated_id' })
  updated_by?: IUser;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_date?: string;
}
