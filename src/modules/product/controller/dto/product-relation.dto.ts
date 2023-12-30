import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, ValidateIf } from "class-validator";
import { IProduct } from "../../domain/interface/product.interface";

export class ProductRelationDto implements IProduct {
  @ApiProperty({
    type: 'string',
    required: true,
    default: '0c8791e4-718a-42a1-98d4-33a16e954409',
  })
	@ValidateIf((body) => body.id)
  @IsUUID()
  id?: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: '00000001',
  })
  @IsString()
  code: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: 'Test product',
  })
  @IsString()
	description: string;
}