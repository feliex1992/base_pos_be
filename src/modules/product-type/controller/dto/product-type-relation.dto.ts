import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { IProductType } from "../../domain/interface/product-type.interface";

export class ProductTypeRelationDto implements IProductType {
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
    default: 'TYP',
  })
  @IsString()
  code: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: 'Type produk',
  })
  @IsString()
  description: string;
}