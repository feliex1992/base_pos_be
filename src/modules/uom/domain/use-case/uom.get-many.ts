import { BaseGetManyUseCase } from "src/base/use-cases/process/base-get-many.use-case";
import { UomGetManyDto } from "../../controller/dto/uom-get-many.dto";
import { UomRepository } from "../../data/uom.repository";
import { IUom } from "../interface/uom.interface";

export class UomGetMany extends BaseGetManyUseCase<IUom> {
  constructor(
    public uomRepository: UomRepository,
    public uomGetManyDto: UomGetManyDto,
  ) {
    super(uomRepository, uomGetManyDto);
  }

  beforeProcess(): Promise<void> {
    return;
  }

  setFilterSearch(): string[] {
    return [`${this.table_name}.code`, `${this.table_name}.description`];
  }

  afterProcess(): Promise<void> {
    return;
  }
}