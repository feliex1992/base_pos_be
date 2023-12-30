import { BaseGetManyUseCase } from "src/base/use-cases/process/base-get-many.use-case";
import { SaleFilterDto } from "../../controller/dto/sale-filter.dto";
import { SaleRepository } from "../../data/sale.repository";
import { ISale } from "../interface/sale.interface";

export class SaleGetMany extends BaseGetManyUseCase<ISale>{
  constructor(
    public saleRepository: SaleRepository,
    public filterDto: SaleFilterDto,
  ) {
    super(saleRepository, filterDto);
  }

  beforeProcess(): Promise<void> {
    return;
  }

  setFilterSearch(): string[] {
    return [`${this.table_name}.no_invoice`];
  }

  afterProcess(): Promise<void> {
    return;
  }
}