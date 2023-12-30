import { ProductCodeRepository } from "../../data/product-code.repository";
import { ProductRepository } from "../../data/product.repository";
import { getProductLastCode } from "../helpers/product-last-code";

export class ProductGetLastCode {
  result: {code: string};

  constructor(
    private productRepository: ProductRepository,
    public productCodeRepository: ProductCodeRepository,
  ) {}

  async execute() {
    const lastCode = await getProductLastCode(
      this.productRepository,
      this.productCodeRepository,
    );
    this.result = {code: lastCode};
  }

  getResult() {
    return this.result;
  }
}