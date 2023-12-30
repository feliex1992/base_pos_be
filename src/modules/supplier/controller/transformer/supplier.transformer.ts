import { BaseTransformer } from "src/base/base.transformer";
import { ISupplier } from "../../domain/interface/supplier.interface";

export class SupplierTransformer extends BaseTransformer<ISupplier> {
  process(entity: ISupplier): ISupplier {
    return {
      id: entity.id,
      code: entity.code,
      description: entity.description,
      address: entity.address,
      contact: entity.contact,
      email: entity.email,
    };
  }
}
