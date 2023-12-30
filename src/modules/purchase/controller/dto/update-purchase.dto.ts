import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsNumber, IsString, ValidateIf, ValidateNested } from "class-validator";
import { SupplierRelationDto } from "src/modules/supplier/controller/dto/supplier-relation.dto";
import { ISupplier } from "src/modules/supplier/domain/interface/supplier.interface";
import { IPurchase } from "../../domain/interface/purchase.interface";
import { PurchaseDetailDto } from "./purchase-detail.dto";

export class UpdatePurchaseDto implements IPurchase {
  @ApiProperty({
    type: SupplierRelationDto,
    required: false,
  })
  @ValidateIf((body) => body.supplier)
  @ValidateNested({ each: true })
  @Type(() => SupplierRelationDto)
	supplier?: ISupplier;

  @ApiProperty({
    type: 'string',
    required: true,
    default: "2023-01-01",
  })
  @ValidateIf((body) => body.purchase_date)
  @IsDateString()
	purchase_date?: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: '000899873',
  })
  @ValidateIf((body) => body.no_invoice_ext)
  @IsString()
	no_invoice_ext?: string;

  @ApiProperty({
    type: [PurchaseDetailDto],
    required: true
  })
  @ValidateNested({ each: true })
  @Type(() => PurchaseDetailDto)
  @IsArray()
  detail?: IPurchase[];

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
  @ValidateIf((body) => body.grand_price_item)
  @IsNumber()
	grand_price_item?: number;

  @ApiProperty({
    type: 'number',
    required: true,
    default: 1
  })
  @ValidateIf((body) => body.disc_invoice)
  @IsNumber()
	disc_invoice?: number;

  @ApiProperty({
    type: 'number',
    required: true,
    default: 1
  })
  @ValidateIf((body) => body.grand_price_invoice)
  @IsNumber()
	grand_price_invoice?: number;

  @ApiProperty({
    type: 'number',
    required: true,
    default: 1
  })
  @ValidateIf((body) => body.grand_price_invoice_ext)
  @IsNumber()
	grand_price_invoice_ext?: number;
}
