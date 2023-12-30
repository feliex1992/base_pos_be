import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsUUID, ValidateIf, ValidateNested } from "class-validator";
import { ProductRelationDto } from "src/modules/product/controller/dto/product-relation.dto";
import { IProduct } from "src/modules/product/domain/interface/product.interface";
import { UomRelationDto } from "src/modules/uom/controller/dto/uom-relation.dto";
import { IUom } from "src/modules/uom/domain/interface/uom.interface";
import { ISaleDetail } from "../../domain/interface/sale-detail.interface";

export class SaleDetailDto implements ISaleDetail {
  @ApiProperty({
    type: 'string',
    required: true,
    default: '0c8791e4-718a-42a1-98d4-33a16e954409',
  })
	@ValidateIf((body) => body.id)
  @IsUUID()
	id?: string;

  @ApiProperty({
    type: 'number',
    required: true,
    default: 1
  })
  @ValidateIf((body) => body.no_queue)
  @IsNumber()
	no_queue?: number;

	@ApiProperty({
    type: ProductRelationDto,
    required: false,
  })
  @ValidateNested({ each: true })
  @Type(() => ProductRelationDto)
  product?: IProduct;

  @ApiProperty({
    type: UomRelationDto,
    required: false,
  })
  @ValidateNested({ each: true })
  @Type(() => UomRelationDto)
  unit_retail?: IUom;
	
  @ApiProperty({
    type: UomRelationDto,
    required: false,
  })
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
    type: 'number',
    required: true,
    default: 1
  })
  @ValidateIf((body) => body.qty_pack)
  @IsNumber()
	qty_pack?: number;

  @ApiProperty({
    type: 'number',
    required: true,
    default: 1
  })
  @ValidateIf((body) => body.qty_retail)
  @IsNumber()
	qty_retail?: number;

  @ApiProperty({
    type: 'number',
    required: true,
    default: 1
  })
  @ValidateIf((body) => body.qty_total)
  @IsNumber()
	qty_total?: number;

  @ApiProperty({
    type: 'number',
    required: true,
    default: 1
  })
  @ValidateIf((body) => body.total_sell_price)
  @IsNumber()
	total_sell_price?: number;

  @ApiProperty({
    type: 'number',
    required: true,
    default: 1
  })
  @ValidateIf((body) => body.total_sell_disc)
  @IsNumber()
	total_sell_disc?: number;

  @ApiProperty({
    type: 'number',
    required: true,
    default: 1
  })
  @ValidateIf((body) => body.total_price_disc)
  @IsNumber()
	total_price_disc?: number;
}