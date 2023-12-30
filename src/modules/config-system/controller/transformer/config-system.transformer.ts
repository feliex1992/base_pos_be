import { BaseTransformer } from "src/base/base.transformer";
import { IWarehouse } from "src/modules/warehouse/domain/interface/warehouse.interface";
import { IConfigSystem } from "../../domain/interface/config-system.interface";

export class ConfigSystemTransformer extends BaseTransformer<IConfigSystem> {
  process(entity: IConfigSystem): IConfigSystem {
    const warehouse: IWarehouse = {
      id: entity.warehouse_purchase.id,
      code: entity.warehouse_purchase.code,
      description: entity.warehouse_purchase.description
    };

    return {
      id: entity.id,
      warehouse_purchase: warehouse,
    };
  }
}
