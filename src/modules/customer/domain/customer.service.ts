import { Injectable } from "@nestjs/common";
import { IPaginationMeta, Pagination } from "nestjs-typeorm-paginate";
import { DistrictRepository } from "src/modules/area/data/district.repository";
import { ProvinceRepository } from "src/modules/area/data/province.repository";
import { SubDistrictRepository } from "src/modules/area/data/sub-district.repository";
import { VillageRepository } from "src/modules/area/data/village.repository";
import { Connection } from "typeorm";
import { CreateCustomerDto } from "../controller/dto/create-customer.dto";
import { CustomerFilterDto } from "../controller/dto/customer-filter.dto";
import { CustomerRepository } from "../data/customer.repository";
import { ICustomer } from "./interface/customer.interface";
import { CustomerCreate } from "./use-case/customer.create";
import { CustomerGetMany } from "./use-case/customer.get-many";

@Injectable()
export class CustomerService {
  constructor(
    private connection: Connection,
    private customerRepository: CustomerRepository,
    private provinceRepository: ProvinceRepository,
    private districtRepository: DistrictRepository,
    private subDistrictRepository: SubDistrictRepository,
    private villageRepository: VillageRepository,
  ) {}

  async create(createDto: CreateCustomerDto) {
    const customerCreate = new CustomerCreate(
      this.connection,
      this.customerRepository,
      createDto,
      this.provinceRepository,
      this.districtRepository,
      this.subDistrictRepository,
      this.villageRepository,
    );
    await customerCreate.execute();
    return customerCreate.getResult();
  }

  async getMany(params: CustomerFilterDto): Promise<Pagination<ICustomer, IPaginationMeta>> {
    const customerGetMany = new CustomerGetMany(
      this.customerRepository,
      params,
    )
    await customerGetMany.execute();
    return customerGetMany.getResult();
  }

  // async update(dataId: string, updateDto: UpdateSupplierDto): Promise<ISupplier> {
  //   const supplierUpdate = new SupplierUpdate(
  //     this.connection,
  //     this.supplierRepository,
  //     dataId,
  //     updateDto,
  //   );
  //   await supplierUpdate.execute();
  //   return supplierUpdate.getResult();
  // }

  // async delete(id: string): Promise<IBatchResult> {
  //   const supplierDelete = new SupplierDelete(
  //     this.connection,
  //     this.supplierRepository,
  //     id
  //   );
  //   await supplierDelete.execute();
  //   return supplierDelete.getResult();
  // }
}
