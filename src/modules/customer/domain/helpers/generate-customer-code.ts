import { pad } from "src/base/helpers/number-pad";
import { IsNull, Not } from "typeorm";
import { CustomerRepository } from "../../data/customer.repository";

export async function generateCustomerCode(
  customerRepository: CustomerRepository,
): Promise<string> {
  let customerCode: string = "CUS00000001"
  let statusLoop = true;

  const lastCustomerCode = await customerRepository.getOne({
    where: {code: Not(IsNull())},
    order: {code: "DESC"},
  });
  if (lastCustomerCode) {
    customerCode = `CUS${pad(parseInt(lastCustomerCode.code.substring(3, 11))+1,8,0)}`
  }

  do {
    const cekCustomer = await customerRepository.getOne({
      where: {code: customerCode}
    });
    if (cekCustomer) {
      customerCode = `CUS${pad(parseInt(cekCustomer.code.substring(3, 11))+1,8,0)}`
    } else {
      statusLoop = false;
    }
  } while (statusLoop);

  return customerCode;
}