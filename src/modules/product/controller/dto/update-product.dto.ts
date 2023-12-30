import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateIf, ValidateNested } from "class-validator";
import { ProductTypeRelationDto } from "src/modules/product-type/controller/dto/product-type-relation.dto";
import { IProductType } from "src/modules/product-type/domain/interface/product-type.interface";
import { UomRelationDto } from "src/modules/uom/controller/dto/uom-relation.dto";
import { IUom } from "src/modules/uom/domain/interface/uom.interface";
import { IProduct } from "../../domain/interface/product.interface";

export class UpdateProductDto implements IProduct {
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

  @ApiProperty({
    type: 'string',
    required: true,
    default: '/image/product.jpg',
  })
  @ValidateIf((body) => body.picture)
  @IsString()
	picture?: string;

  @ApiProperty({
    type: ProductTypeRelationDto,
    required: false,
  })
  @ValidateIf((body) => body.product_type)
  @ValidateNested({ each: true })
  @Type(() => ProductTypeRelationDto)
  product_type: IProductType;

  @ApiProperty({
    type: UomRelationDto,
    required: false,
  })
  @ValidateIf((body) => body.unit_retail)
  @ValidateNested({ each: true })
  @Type(() => UomRelationDto)
  unit_retail?: IUom;

	@ApiProperty({
    type: UomRelationDto,
    required: false,
  })
  @ValidateIf((body) => body.unit_pack)
  @ValidateNested({ each: true })
  @Type(() => UomRelationDto)
  unit_pack?: IUom;

  @ApiProperty({
    type: 'number',
    required: true,
    default: 1
  })
  @ValidateIf((body) => body.unit_pack_content)
  @IsNumber()
	unit_pack_content?: number;

	@ApiProperty({
    type: UomRelationDto,
    required: false,
  })
  @ValidateIf((body) => body.unit_buy)
  @ValidateNested({ each: true })
  @Type(() => UomRelationDto)
  unit_buy?: IUom;

  @ApiProperty({
    type: 'number',
    required: true,
    default: 1
  })
  @ValidateIf((body) => body.unit_buy_content)
  @IsNumber()
	unit_buy_content?: number;

  @ApiProperty({
    type: 'number',
    required: true,
    default: 1000
  })
  @ValidateIf((body) => body.last_buy_price)
  @IsNumber()
	last_buy_price?: number;

  @ApiProperty({
    type: 'number',
    required: true,
    default: 1000
  })
  @ValidateIf((body) => body.retail_sell_price)
  @IsNumber()
	retail_sell_price?: number;

  @ApiProperty({
    type: 'number',
    required: true,
    default: 1000
  })
  @ValidateIf((body) => body.retail_sell_disc)
  @IsNumber()
	retail_sell_disc?: number;

  @ApiProperty({
    type: 'number',
    required: true,
    default: 1000
  })
  @ValidateIf((body) => body.pack_sell_price)
  @IsNumber()
	pack_sell_price?: number;

  @ApiProperty({
    type: 'number',
    required: true,
    default: 1000
  })
  @ValidateIf((body) => body.pack_sell_disc)
  @IsNumber()
	pack_sell_disc?: number;
}
