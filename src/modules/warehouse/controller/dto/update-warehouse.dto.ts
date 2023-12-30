import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, ValidateIf } from "class-validator";
import { IWarehouse } from "../../domain/interface/warehouse.interface";

export class UpdateWarehouseDto implements IWarehouse {
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

  @ApiProperty({
    type: 'boolean',
    required: false,
    default: false,
  })
  @ValidateIf((body) => body.status_transaction)
  @IsBoolean()
  status_transaction?: boolean = false;
}
