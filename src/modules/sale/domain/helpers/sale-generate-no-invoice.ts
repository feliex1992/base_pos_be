import { pad } from "src/base/helpers/number-pad";
import { Like } from "typeorm";
import { SaleRepository } from "../../data/sale.repository";

export async function saleGenerateNoInvoice(
  saleRepository: SaleRepository,
  dateString: string,
): Promise<string> {
  // "SL23020001"
  let noInvoice = `SL${dateString.substring(2,4)}${dateString.substring(5,7)}0001`
  const sale = await saleRepository.getOne({
    where: {sale_date: Like(dateString.substring(0, 7))},
    order: {no_invoice: "DESC"},
  });
  if (sale) {
    noInvoice = sale.no_invoice ? `${sale.no_invoice.substring(0, 6)}${pad(parseInt(sale.no_invoice.substring(6, 10))+1, 4, 0)}` : `${noInvoice.substring(0, 6)}${pad(parseInt(noInvoice.substring(6, 10))+1, 4, 0)}`;
  }
  let statLoop = true;
  do {
    const cekSale = await saleRepository.getOne({
      where: {no_invoice: noInvoice}
    });
    if (cekSale) {
      noInvoice = `${noInvoice.substring(0, 6)}${pad(parseInt(noInvoice.substring(6, 10))+1, 4, 0)}`;
    } else {
      statLoop = false;
    }
  } while(statLoop);
  return noInvoice;
}