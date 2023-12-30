import { BaseTransformer } from "src/base/base.transformer";
import { IVillage } from "src/modules/area/domain/interface/village.interface";
import { ICustomer } from "../../domain/interface/customer.interface";

export class CustomerTransformer extends BaseTransformer<ICustomer> {
  process(entity: ICustomer): ICustomer {
    const village: IVillage = {
      id: entity.village.id,
      name: entity.village.name,
      sub_district: {
        id: entity.village.sub_district.id,
        name: entity.village.sub_district.name,
        district: {
          id: entity.village.sub_district.district.id,
          name: entity.village.sub_district.district.name,
          province: {
            id: entity.village.sub_district.district.province.id,
            name: entity.village.sub_district.district.province.name,
          }
        }
      }
    };
    
    return {
      id: entity.id,
      code: entity.code,
      name: entity.name,
      nik: entity.nik,
      place_birth: entity.place_birth,
      date_birth: entity.date_birth,
      street: entity.street,
      village: village,
      religion: entity.religion,
      martial_status: entity.martial_status,
      job: entity.job,
      contact: entity.contact,
      email: entity.email,
    };
  }
}
