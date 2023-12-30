import { BaseDeleteUseCase } from "src/base/use-cases/process/base-delete.use-case"
import { Connection } from "typeorm";
import { Uom } from "../../data/entities/uom.entity";
import { UomRepository } from "../../data/uom.repository";
import { IUom } from "../interface/uom.interface";

export class UomDelete extends BaseDeleteUseCase<IUom>{
  constructor(
    private uomConn: Connection,
    private uomRepository: UomRepository,
    private dataId: string,
  ) {
    super(uomConn, uomRepository, Uom, dataId);
  }

  validateProcess(): Promise<void> {
    return;
  }

  beforeProcess(): Promise<void> {
    // TODO cek uom is used or not in data product.
    return;
  }

  afterProcess(): Promise<void> {
    return;
  }
}