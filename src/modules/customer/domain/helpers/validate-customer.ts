import { DistrictRepository } from "src/modules/area/data/district.repository";
import { District } from "src/modules/area/data/entities/district.entity";
import { Province } from "src/modules/area/data/entities/province.entity";
import { SubDistrict } from "src/modules/area/data/entities/sub-district.entity";
import { Village } from "src/modules/area/data/entities/village.entity";
import { ProvinceRepository } from "src/modules/area/data/province.repository";
import { SubDistrictRepository } from "src/modules/area/data/sub-district.repository";
import { VillageRepository } from "src/modules/area/data/village.repository";
import { QueryRunner } from "typeorm";
import { CustomerRepository } from "../../data/customer.repository";
import { ICustomer } from "../interface/customer.interface";

export async function validateCustomer(
  customerRepository: CustomerRepository,
  dataId: string,
  customer: ICustomer,
  queryRunner: QueryRunner,
  provinceRepository: ProvinceRepository,
  districtRepository: DistrictRepository,
  subDistrictRepository: SubDistrictRepository,
  villageRepository: VillageRepository,
) {
  const cekCustomer = await customerRepository.getOne({
    where: {nik: customer.nik}
  })
  if (cekCustomer) {
    if (dataId) {
      if (dataId !== cekCustomer.id) throw new Error('Nik customer sudah digunakan!');
    } else {
      throw new Error('Nik customer sudah digunakan!');
    }
  }

  const cekProvince = await provinceRepository.getOne({
    where: {name: customer.village.sub_district.district.province.name}
  });
  if (!cekProvince) {
    // if province not found then create all sub data
    const resProvince = await provinceRepository.createData(
      queryRunner,
      Province,
      {name: customer.village.sub_district.district.province.name}
    )
    const resDistrict = await districtRepository.createData(
      queryRunner,
      District,
      {
        name: customer.village.sub_district.district.name,
        province: {
          id: resProvince.id,
          name: resProvince.name
        }
      }
    )
    const resSubDistrict = await subDistrictRepository.createData(
      queryRunner,
      SubDistrict,
      {
        name: customer.village.sub_district.name,
        district: {
          id: resDistrict.id,
          name: resDistrict.name
        }
      }
    )
    const resVillage = await villageRepository.createData(
      queryRunner,
      Village,
      {
        name: customer.village.name,
        sub_district: {
          id: resSubDistrict.id,
          name: resSubDistrict.name
        }
      }
    )
    customer.village.id = resVillage.id;
    customer.village.sub_district.id = resSubDistrict.id;
    customer.village.sub_district.district.id = resDistrict.id;
    customer.village.sub_district.district.province.id = resProvince.id;
  } else {
    const cekDistrict = await districtRepository.getOne({
      where: {
        name: customer.village.sub_district.district.name,
        province_id: cekProvince.id,
      }
    });
    if (!cekDistrict) {
      const resDistrict = await districtRepository.createData(
        queryRunner,
        District,
        {
          name: customer.village.sub_district.district.name,
          province: {
            id: cekProvince.id,
            name: cekProvince.name
          }
        }
      )
      const resSubDistrict = await subDistrictRepository.createData(
        queryRunner,
        SubDistrict,
        {
          name: customer.village.sub_district.name,
          district: {
            id: resDistrict.id,
            name: resDistrict.name
          }
        }
      );
      const resVillage = await villageRepository.createData(
        queryRunner,
        Village,
        {
          name: customer.village.name,
          sub_district: {
            id: resSubDistrict.id,
            name: resSubDistrict.name
          }
        }
      );
      customer.village.id = resVillage.id;
      customer.village.sub_district.id = resSubDistrict.id;
      customer.village.sub_district.district.id = resDistrict.id;
      customer.village.sub_district.district.province.id = cekProvince.id;
    } else {
      const cekSubDistrict = await subDistrictRepository.getOne({
        where: {
          name: customer.village.sub_district.name,
          district_id: cekDistrict.id,
        }
      });
      if (!cekSubDistrict) {
        const resSubDistrict = await subDistrictRepository.createData(
          queryRunner,
          SubDistrict,
          {
            name: customer.village.sub_district.name,
            district: {
              id: cekDistrict.id,
              name: cekDistrict.name,
            }
          }
        );
        const resVillage = await villageRepository.createData(
          queryRunner,
          Village,
          {
            name: customer.village.name,
            sub_district: {
              id: resSubDistrict.id,
              name: resSubDistrict.name,
            }
          }
        );
        customer.village.id = resVillage.id;
        customer.village.sub_district.id = resSubDistrict.id;
        customer.village.sub_district.district.id = cekDistrict.id;
        customer.village.sub_district.district.province.id = cekProvince.id;
      } else {
        const cekVillage = await villageRepository.getOne({
          where: {
            name: customer.village.name,
            sub_district_id: cekSubDistrict.id,
          }
        })
        if (!cekVillage) {
          const resVillage = await villageRepository.createData(
            queryRunner,
            Village,
            {
              name: customer.village.name,
              sub_district: {
                id: cekSubDistrict.id,
                name: cekSubDistrict.name,
              }
            }
          );
          customer.village.id = resVillage.id;
          customer.village.sub_district.id = cekSubDistrict.id;
          customer.village.sub_district.district.id = cekDistrict.id;
          customer.village.sub_district.district.province.id = cekProvince.id;
        } else {
          customer.village.id = cekVillage.id;
          customer.village.sub_district.id = cekSubDistrict.id;
          customer.village.sub_district.district.id = cekDistrict.id;
          customer.village.sub_district.district.province.id = cekProvince.id;
        }
      }
    }
  }
}