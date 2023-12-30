import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IUom } from '../../domain/interface/uom.interface';

export class UpdateUomDto implements IUom{
  @ApiProperty({
    type: 'string',
    required: true,
    default: 'admin',
  })
  @IsString()
  code: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: 'admin',
  })
  @IsString()
  description: string;
}
