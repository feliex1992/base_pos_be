import { BaseGetManyUseCase } from "src/base/use-cases/process/base-get-many.use-case";
import { CustomerFilterDto } from "../../controller/dto/customer-filter.dto";
import { CustomerRepository } from "../../data/customer.repository";
import { ICustomer } from "../interface/customer.interface";

export class CustomerGetMany extends BaseGetManyUseCase<ICustomer> {
  constructor(
    public customerRepository: CustomerRepository,
    public filterDto: CustomerFilterDto,
  ) {
    super(customerRepository, filterDto);
  }

  beforeProcess(): Promise<void> {
    return;
  }

  setFilterSearch(): string[] {
    return [`${this.table_name}.code`, `${this.table_name}.name`];
  }

  afterProcess(): Promise<void> {
    return;
  }
}