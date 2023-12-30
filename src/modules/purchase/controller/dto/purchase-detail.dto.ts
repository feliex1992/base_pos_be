import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsUUID, ValidateIf, ValidateNested } from "class-validator";
import { ProductRelationDto } from "src/modules/product/controller/dto/product-relation.dto";
import { IProduct } from "src/modules/product/domain/interface/product.interface";
import { UomRelationDto } from "src/modules/uom/controller/dto/uom-relation.dto";
import { IUom } from "src/modules/uom/domain/interface/uom.interface";
import { IPurchaseDetail } from "../../domain/interface/purchase-detail.interface";

export class PurchaseDetailDto implements IPurchaseDetail {
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
	unit_buy?: IUom;

	@ApiProperty({
    type: UomRelationDto,
    required: false,
  })
  @ValidateNested({ each: true })
  @Type(() => UomRelationDto)
	unit_retail?: IUom;

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
    default: 1
  })
  @ValidateIf((body) => body.buy_price_item)
  @IsNumber()
	buy_price_item?: number;

	@ApiProperty({
    type: 'number',
    required: true,
    default: 1
  })
  @ValidateIf((body) => body.qty_pak)
  @IsNumber()
	qty_pak?: number;

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
  @ValidateIf((body) => body.total_price_item)
  @IsNumber()
	total_price_item?: number;

	@ApiProperty({
    type: 'number',
    required: true,
    default: 1
  })
  @ValidateIf((body) => body.total_disc_item)
  @IsNumber()
	total_disc_item?: number;

	@ApiProperty({
    type: 'number',
    required: true,
    default: 1
  })
  @ValidateIf((body) => body.total_price_disc)
  @IsNumber()
	total_price_disc?: number;
}
