import { BaseGetManyUseCase } from "src/base/use-cases/process/base-get-many.use-case";
import { PurchaseGetManyDto } from "../../controller/dto/purchase-get-many.dto";
import { PurchaseRepository } from "../../data/purchase.repository";
import { IPurchase } from "../interface/purchase.interface";

export class PurchaseGetMany extends BaseGetManyUseCase<IPurchase>{
  constructor(
    public purchaseRepository: PurchaseRepository,
    public getManyDto: PurchaseGetManyDto,
  ) {
    super(purchaseRepository, getManyDto);
  }

  beforeProcess(): Promise<void> {
    return;
  }

  setFilterSearch(): string[] {
    return [`${this.table_name}.no_invoice`, `${this.table_name}.no_invoice_ext`];
  }

  afterProcess(): Promise<void> {
    return;
  }
}