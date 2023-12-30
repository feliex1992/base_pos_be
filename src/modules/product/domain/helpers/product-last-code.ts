import { pad } from "src/base/helpers/number-pad";
import { IsNull, Not } from "typeorm";
import { ProductCodeRepository } from "../../data/product-code.repository";
import { ProductRepository } from "../../data/product.repository";

export async function getProductLastCode(
  productRepository: ProductRepository,
  productCodeRepository: ProductCodeRepository,
): Promise<string> {
  let lastCode: string = pad(1, 8, 0).toString();

  const cekParamCode = await productCodeRepository.getOne({
    where: {id: Not(IsNull())}
  });

  if (cekParamCode) lastCode = pad(parseInt(cekParamCode.code) + 1, 8, 0);

  let loopCek = true;
  do {
    const cekOnProduct = await productRepository.getOne({
      where: {code: lastCode}
    });
    if (cekOnProduct) {
      lastCode = pad(parseInt(lastCode) + 1, 8, 0);
    } else {
      loopCek = false;
    }
  } while(loopCek);

  return lastCode;
}