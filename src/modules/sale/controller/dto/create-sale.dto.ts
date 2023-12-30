import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsNumber, ValidateIf, ValidateNested } from "class-validator";
import { CustomerRelationDto } from "src/modules/customer/controller/dto/customer-relation.dto";
import { ICustomer } from "src/modules/customer/domain/interface/customer.interface";
import { ISaleDetail } from "../../domain/interface/sale-detail.interface";
import { ISale } from "../../domain/interface/sale.interface";
import { SaleDetailDto } from "./sale-detail.dto";

export class CreateSaleDto implements ISale{
  @ApiProperty({
    type: CustomerRelationDto,
    required: false,
  })
  @ValidateIf((body) => body.customer)
  @ValidateNested({ each: true })
  @Type(() => CustomerRelationDto)
	customer?: ICustomer;

  @ApiProperty({
    type: 'string',
    required: true,
    default: "2023-01-01",
  })
  @ValidateIf((body) => body.purchase_date)
  @IsDateString()
	sale_date?: string;

  @ApiProperty({
    type: [SaleDetailDto],
    required: true
  })
  @ValidateNested({ each: true })
  @Type(() => SaleDetailDto)
  @IsArray()
  detail?: ISaleDetail[];

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
  @ValidateIf((body) => body.cash_payment)
  @IsNumber()
	cash_payment?: number;

  @ApiProperty({
    type: 'number',
    required: true,
    default: 1
  })
  @ValidateIf((body) => body.non_cash_payment)
  @IsNumber()
	non_cash_payment?: number;

  @ApiProperty({
    type: 'number',
    required: true,
    default: 1
  })
  @ValidateIf((body) => body.change)
  @IsNumber()
	change?: number;

  @ApiProperty({
    type: 'number',
    required: true,
    default: 1
  })
  @ValidateIf((body) => body.rounding)
  @IsNumber()
	rounding?: number;
}
