import { IWarehouse } from "../../domain/interface/warehouse.interface";
import { UpdateWarehouseDto } from "./update-warehouse.dto";

export class CreateWarehouseDto extends UpdateWarehouseDto implements IWarehouse {}
