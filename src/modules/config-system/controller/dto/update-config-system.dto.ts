import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateIf, ValidateNested } from "class-validator";
import { WarehouseRelationDto } from "src/modules/warehouse/controller/dto/warehouse-relation.dto";
import { IWarehouse } from "src/modules/warehouse/domain/interface/warehouse.interface";
import { IConfigSystem } from "../../domain/interface/config-system.interface";

export class UpdateConfigSystemDto implements IConfigSystem {
  @ApiProperty({
    type: WarehouseRelationDto,
    required: false,
  })
  @ValidateIf((body) => body.warehouse_purchase)
  @ValidateNested({ each: true })
  @Type(() => WarehouseRelationDto)
  warehouse_purchase: IWarehouse;
}
