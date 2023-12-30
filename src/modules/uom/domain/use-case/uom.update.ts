import { BaseUpdateUseCase } from "src/base/use-cases/process/base-update.use-case";
import { Connection } from "typeorm";
import { Uom } from "../../data/entities/uom.entity";
import { UomRepository } from "../../data/uom.repository";
import { validateUom } from "../helpers/validate-uom";
import { IUom } from "../interface/uom.interface";

export class UomUpdate extends BaseUpdateUseCase<IUom>{
  constructor(
    private uomConn: Connection,
    private uomRepository: UomRepository,
    private dataId: string,
    private uom: IUom,
  ) {
    super(uomConn, uomRepository, Uom, dataId, uom);
  }

  async beforeProcess(): Promise<void> {
    await validateUom(
      this.uomRepository,
      this.dataId,
      this.uom
    )
    return;
  }

  afterProcess(): Promise<void> {
    return;
  }
}