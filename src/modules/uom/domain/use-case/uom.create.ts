import { BaseCreateUseCase } from "src/base/use-cases/process/base-create.use-case";
import { Connection } from "typeorm";
import { Uom } from "../../data/entities/uom.entity";
import { UomRepository } from "../../data/uom.repository";
import { validateUom } from "../helpers/validate-uom";
import { IUom } from "../interface/uom.interface";

export class UomCreate extends BaseCreateUseCase<IUom>{
  constructor(
    private uomConn: Connection,
    private uomRepository: UomRepository,
    private uom: IUom,
  ) {
    super(uomConn, uomRepository, Uom, uom);
  }

  async beforeProcess(): Promise<void> {
    await validateUom(
      this.uomRepository,
      undefined,
      this.uom
    );
    return;
  }
}