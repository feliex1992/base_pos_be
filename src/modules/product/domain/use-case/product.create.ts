import { BaseCreateUseCase } from "src/base/use-cases/process/base-create.use-case";
import { ProductTypeRepository } from "src/modules/product-type/data/product-type.repository";
import { UomRepository } from "src/modules/uom/data/uom.repository";
import { Connection, IsNull, Not } from "typeorm";
import { ProductCode } from "../../data/entities/product-code.entity";
import { Product } from "../../data/entities/product.entity";
import { ProductCodeRepository } from "../../data/product-code.repository";
import { ProductRepository } from "../../data/product.repository";
import { getProductLastCode } from "../helpers/product-last-code";
import { validateProduct } from "../helpers/validate-product";
import { IProductCode } from "../interface/product-code.interface";
import { IProduct } from "../interface/product.interface";

export class ProductCreate extends BaseCreateUseCase<IProduct> {
  constructor(
    private productConn: Connection,
    private productRepository: ProductRepository,
    private product: IProduct,
    private productCodeRepository: ProductCodeRepository,
    private productTypeRepository: ProductTypeRepository,
    private uomRepository: UomRepository,
  ) {
    super(productConn, productRepository, Product, product);
  }

  async beforeProcess(): Promise<void> {
    await validateProduct(
      this.productRepository,
      undefined,
      this.product,
      this.productTypeRepository,
      this.uomRepository,
    )
    
    const lastCode = await getProductLastCode(
      this.productRepository,
      this.productCodeRepository,
    );

    if (lastCode === this.product.code) {
      const productCode: IProductCode = await this.productCodeRepository.getOne({
        where: {id: Not(IsNull())}
      });
      if (productCode) {
        await this.productCodeRepository.updateDataById(
          this.queryRunner,
          ProductCode,
          productCode.id,
          {code: lastCode},
        );
      } else {
        await this.productCodeRepository.createData(
          this.queryRunner,
          ProductCode,
          {code: lastCode},
        );
      }
    }
    return;
  }
}
