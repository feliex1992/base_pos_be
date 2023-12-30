import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateIf, ValidateNested } from 'class-validator';
import { CreateProductCategoryDto } from 'src/modules/product-category/controller/dto/create-product-category.dto';
import { ProductCategoryRelationDto } from 'src/modules/product-category/controller/dto/product-category-relation.dto';
import { IProductCategory } from 'src/modules/product-category/domain/interface/product-category.interface';
import { IProductType } from '../../domain/interface/product-type.interface';

export class UpdateProductTypeDto implements IProductType {
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

  @ApiProperty({
    type: ProductCategoryRelationDto,
    required: false,
  })
  @ValidateIf((body) => body.product_category)
  @ValidateNested({ each: true })
  @Type(() => ProductCategoryRelationDto)
  product_category?: IProductCategory;
}
