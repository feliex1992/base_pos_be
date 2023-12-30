import { User } from 'src/modules/user/data/entities/user.entity';
import { IUser } from 'src/modules/user/domain/interface/user.interface';
import { Column, CreateDateColumn, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { IBaseFooter } from '../interface/base-footer.interface';

export class BaseFooterEntity implements IBaseFooter {
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
