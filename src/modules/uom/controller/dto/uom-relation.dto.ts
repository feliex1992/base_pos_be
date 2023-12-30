import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { IUom } from "../../domain/interface/uom.interface";

export class UomRelationDto implements IUom {
  @ApiProperty({
    type: 'string',
    required: true,
    default: '0c8791e4-718a-42a1-98d4-33a16e954409',
  })
  @IsUUID()
  id?: string;

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