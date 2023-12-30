import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, ValidateIf } from "class-validator";
import { ISupplier } from "../../domain/interface/supplier.interface";

export class UpdateSupplierDto implements ISupplier {
  @ApiProperty({
    type: 'string',
    required: true,
    default: 'UMUM',
  })
  @IsString()
  code: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: 'Supplier Umum',
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: 'Jl. supplier umum kota bandung No. 45',
  })
  @ValidateIf((body) => body.address)
  @IsString()
  address: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: '022-9823884',
  })
  @ValidateIf((body) => body.contact)
  @IsString()
  contact: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: 'admin@umum.com',
  })
  @ValidateIf((body) => body.email)
  @IsString()
  @IsEmail()
  email: string;
}
