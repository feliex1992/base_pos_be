import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsUUID, ValidateIf, ValidateNested } from "class-validator";
import { IDistrict } from "../../domain/interface/district.interface";
import { IProvince } from "../../domain/interface/province.interface";
import { ProvinceRelationDto } from "./province-relation.dto";

export class DistrictRelationDto implements IDistrict {
  @ApiProperty({
    type: 'string',
    required: true,
    default: '0c8791e4-718a-42a1-98d4-33a16e954409',
  })
	@ValidateIf((body) => body.id)
  @IsUUID()
  id?: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: 'bandung barat',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: ProvinceRelationDto,
    required: false,
  })
  @ValidateIf((body) => body.province)
  @ValidateNested({ each: true })
  @Type(() => ProvinceRelationDto)
  province: IProvince;
}