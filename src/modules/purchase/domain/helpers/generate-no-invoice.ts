import { pad } from "src/base/helpers/number-pad";
import { Like } from "typeorm";
import { PurchaseRepository } from "../../data/purchase.repository";

export async function generateNoInvoice(
  purchaseRepository: PurchaseRepository,
  dateString: string,
): Promise<string> {
  // "PR23020001"
  let noInvoice = `PR${dateString.substring(2,4)}${dateString.substring(5,7)}0001`
  const purchase = await purchaseRepository.getOne({
    where: {purchase_date: Like(dateString.substring(0, 7))},
    order: {no_invoice: "DESC"},
  });
  if (purchase) {
    noInvoice = purchase.no_invoice ? `${purchase.no_invoice.substring(0, 6)}${pad(parseInt(purchase.no_invoice.substring(6, 10))+1, 4, 0)}` : `${noInvoice.substring(0, 6)}${pad(parseInt(noInvoice.substring(6, 10))+1, 4, 0)}`;
  }
  let statLoop = true;
  do {
    const cekPurchase = await purchaseRepository.getOne({
      where: {no_invoice: noInvoice}
    });
    if (cekPurchase) {
      noInvoice = `${noInvoice.substring(0, 6)}${pad(parseInt(noInvoice.substring(6, 10))+1, 4, 0)}`;
    } else {
      statLoop = false;
    }
  } while(statLoop);
  return noInvoice;
}