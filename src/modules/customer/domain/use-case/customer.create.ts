import { BaseCreateUseCase } from "src/base/use-cases/process/base-create.use-case";
import { DistrictRepository } from "src/modules/area/data/district.repository";
import { ProvinceRepository } from "src/modules/area/data/province.repository";
import { SubDistrictRepository } from "src/modules/area/data/sub-district.repository";
import { VillageRepository } from "src/modules/area/data/village.repository";
import { Connection } from "typeorm";
import { CustomerRepository } from "../../data/customer.repository";
import { Customer } from "../../data/entities/customer.entity";
import { generateCustomerCode } from "../helpers/generate-customer-code";
import { validateCustomer } from "../helpers/validate-customer";
import { ICustomer } from "../interface/customer.interface";

export class CustomerCreate extends BaseCreateUseCase<ICustomer> {
  constructor(
    private customerConn: Connection,
    private customerRepository: CustomerRepository,
    private customer: ICustomer,
    private provinceRepository: ProvinceRepository,
    private districtRepository: DistrictRepository,
    private subDistrictRepository: SubDistrictRepository,
    private villageRepository: VillageRepository,
  ) {
    super(customerConn, customerRepository, Customer, customer);
  }

  async beforeProcess(): Promise<void> {
    this.customer.code = await generateCustomerCode(this.customerRepository);
    await validateCustomer(
      this.customerRepository,
      undefined,
      this.customer,
      this.queryRunner,
      this.provinceRepository,
      this.districtRepository,
      this.subDistrictRepository,
      this.villageRepository,
    );
    return;
  }
}
