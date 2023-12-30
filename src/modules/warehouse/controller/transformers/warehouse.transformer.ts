import { BaseTransformer } from "src/base/base.transformer";
import { IWarehouse } from "../../domain/interface/warehouse.interface";

export class WarehouseTransformer extends BaseTransformer<IWarehouse> {
  process(entity: IWarehouse): IWarehouse {
    return {
      id: entity.id,
      code: entity.code,
      description: entity.description,
      status_transaction: entity.status_transaction,
    };
  }
}
