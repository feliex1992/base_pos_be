import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsUUID, ValidateIf, ValidateNested } from "class-validator";
import { ISubDistrict } from "../../domain/interface/sub-district.interface";
import { IVillage } from "../../domain/interface/village.interface";
import { SubDistrictRelationDto } from "./sub-district-relation.dto";

export class VillageRelationDto implements IVillage {
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
    default: 'selacau',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: SubDistrictRelationDto,
    required: false,
  })
  @ValidateIf((body) => body.sub_district)
  @ValidateNested({ each: true })
  @Type(() => SubDistrictRelationDto)
  sub_district: ISubDistrict;
}