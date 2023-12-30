import { TABLE_NAME } from 'src/base/base-constant';
import { UserCategory } from 'src/modules/user-category/data/entities/user-category.entity';
import { IUserCategory } from 'src/modules/user-category/domain/interface/user-category.interface';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IUser } from '../../domain/interface/user.interface';

@Entity(TABLE_NAME.USER)
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', {
    length: 100,
    nullable: false,
    unique: true,
  })
  user_id: string;

  @Column('varchar', { length: 100, nullable: false })
  user_name: string;

  @Column('varchar', { length: 255, nullable: true })
  avatar?: string;

  @Column('varchar', { length: 100, nullable: true })
  email?: string;

  @Column('varchar', { length: 255, nullable: true })
  address?: string;

  @Column('text', { nullable: true })
  contact?: string;

  @Column('varchar', { nullable: false })
  password?: string;

  @Column('varchar', { nullable: false })
  salt?: string;

  @Column('uuid', { nullable: true })
  user_category_id?: string;

  @ManyToOne(() => UserCategory, (userCategory) => userCategory)
  @JoinColumn({ name: 'user_category_id' })
  user_category?: IUserCategory;

  @Column('uuid', { nullable: true })
  created_id?: string;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'created_id' })
  created_by?: IUser;

  @CreateDateColumn({ type: 'timestamp' })
  created_date?: string;

  @Column('uuid', { nullable: true })
  updated_id?: string;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'updated_id' })
  updated_by?: IUser;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_date?: string;
}
