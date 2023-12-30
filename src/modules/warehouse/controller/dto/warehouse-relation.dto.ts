import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, ValidateIf } from "class-validator";

export class WarehouseRelationDto {
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
    default: 'ADM',
  })
  @IsString()
  code: string;

  @ApiProperty({
    type: 'string',
    required: true,
    default: 'Administrator',
  })
  @IsString()
  description: string;
}