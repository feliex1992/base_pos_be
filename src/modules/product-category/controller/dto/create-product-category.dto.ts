import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IProductCategory } from "../../domain/interface/product-category.interface";

export class CreateProductCategoryDto implements IProductCategory {
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
