import { PrimaryGeneratedColumn } from 'typeorm';
import { IBase } from '../interface/base.interface';
import { BaseFooterEntity } from './base-footer.entity';

export class BaseEntity extends BaseFooterEntity implements IBase{
  @PrimaryGeneratedColumn('uuid')
  id?: string;
}
