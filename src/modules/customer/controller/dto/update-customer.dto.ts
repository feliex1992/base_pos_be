import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsEmail, IsString, ValidateIf, ValidateNested } from 'class-validator';
import { VillageRelationDto } from 'src/modules/area/controller/dto/village-relation.dto';
import { IVillage } from 'src/modules/area/domain/interface/village.interface';
import { ICustomer } from '../../domain/interface/customer.interface';

export class UpdateCustomerDto implements ICustomer {
  @ApiProperty({
    type: 'string',
    required: true,
    default: 'Regular',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: '3217090101010001',
  })
  @IsString()
  nik: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: 'bandung',
  })
  @IsString()
	place_birth: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: '2001-01-01',
  })
  @IsDateString()
	date_birth: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: 'Jl. Regular',
  })
  @ValidateIf((body) => body.address)
  @IsString()
  street: string;

  @ApiProperty({
    type: VillageRelationDto,
    required: false,
  })
  @ValidateIf((body) => body.village)
  @ValidateNested({ each: true })
  @Type(() => VillageRelationDto)
	village: IVillage;

  @ApiProperty({
    type: 'string',
    required: true,
    default: 'bandung barat',
  })
  @IsString()
	district: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: 'jawa barat',
  })
  @IsString()
	province: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: 'islam',
  })
  @IsString()
  religion: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: 'belum kawin',
  })
  @IsString()
	martial_status: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: 'karyawan swasta',
  })
  @IsString()
	job: string;

  @ApiProperty({
    type: 'string',
    required: false,
    default: '022-9823884',
  })
  @ValidateIf((body) => body.contact)
  @IsString()
  contact: string;

  @ApiProperty({
    type: 'string',
    required: false,
    default: 'admin@umum.com',
  })
  @ValidateIf((body) => body.email)
  @IsString()
  @IsEmail()
  email: string;
}
