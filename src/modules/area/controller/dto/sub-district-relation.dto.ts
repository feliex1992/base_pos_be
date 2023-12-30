import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsUUID, ValidateIf, ValidateNested } from "class-validator";
import { IDistrict } from "../../domain/interface/district.interface";
import { IProvince } from "../../domain/interface/province.interface";
import { ISubDistrict } from "../../domain/interface/sub-district.interface";
import { DistrictRelationDto } from "./district-relation.dto";
import { ProvinceRelationDto } from "./province-relation.dto";

export class SubDistrictRelationDto implements ISubDistrict {
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
    default: 'batujajar',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: DistrictRelationDto,
    required: false,
  })
  @ValidateIf((body) => body.district)
  @ValidateNested({ each: true })
  @Type(() => DistrictRelationDto)
  district: IDistrict;
}