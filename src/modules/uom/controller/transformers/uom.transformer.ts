import { BaseTransformer } from "src/base/base.transformer";
import { IUom } from "../../domain/interface/uom.interface";

export class UomTransformer extends BaseTransformer<IUom> {
  process(entity: IUom): IUom {
    return {
      id: entity.id,
      code: entity.code,
      description: entity.description
    };
  }
}
