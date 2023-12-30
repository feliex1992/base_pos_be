import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { IProductCategory } from "../../domain/interface/product-category.interface";

export class ProductCategoryRelationDto implements IProductCategory {
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
