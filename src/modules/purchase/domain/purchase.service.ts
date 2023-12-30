import { Injectable } from '@nestjs/common';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { ConfigSystemRepository } from 'src/modules/config-system/data/config-system.repository';
import { ProductRepository } from 'src/modules/product/data/product.repository';
import { StockCardRepository } from 'src/modules/stock/data/stock-card.repository';
import { StockFifoRepository } from 'src/modules/stock/data/stock-fifo.repository';
import { StockRepository } from 'src/modules/stock/data/stock.repository';
import { SupplierRepository } from 'src/modules/supplier/data/supplier.repository';
import { UomRepository } from 'src/modules/uom/data/uom.repository';
import { WarehouseRepository } from 'src/modules/warehouse/data/warehouse.repository';
import { Connection } from 'typeorm';
import { CreatePurchaseDto } from '../controller/dto/create-purchase.dto';
import { PurchaseGetManyDto } from '../controller/dto/purchase-get-many.dto';
import { PurchaseRepository } from '../data/purchase.repository';
import { IPurchase } from './interface/purchase.interface';
import { PurchaseCreate } from './use-case/purchase.create';
import { PurchaseGetMany } from './use-case/purchase.get-many';

@Injectable()
export class PurchaseService {
  constructor(
    private connection: Connection,
    private purchaseRepository: PurchaseRepository,
    private supplierRepository: SupplierRepository,
    private productRepository: ProductRepository,
    private uomRepository: UomRepository,
    private stockRepository: StockRepository,
    private stockCardRepository: StockCardRepository,
    private stockFifoRepository: StockFifoRepository,
    private configSystemRepository: ConfigSystemRepository,
    private warehouseRepository: WarehouseRepository,
  ) {}

  async create(createDto: CreatePurchaseDto) {
    const purchaseCreate = new PurchaseCreate(
      this.connection,
      this.purchaseRepository,
      createDto,
      this.supplierRepository,
      this.productRepository,
      this.uomRepository,
      this.stockRepository,
      this.stockCardRepository,
      this.stockFifoRepository,
      this.configSystemRepository,
      this.warehouseRepository,
    );
    await purchaseCreate.execute();
    return purchaseCreate.getResult();
  }

  async getMany(params: PurchaseGetManyDto): Promise<Pagination<IPurchase, IPaginationMeta>> {
    const purchaseGetMany = new PurchaseGetMany(
      this.purchaseRepository,
      params,
    )
    await purchaseGetMany.execute();
    return purchaseGetMany.getResult();
  }

  // async update(dataId: string, updateDto: UpdateProductDto): Promise<IProduct> {
  //   const productUpdate = new ProductUpdate(
  //     this.connection,
  //     this.productRepository,
  //     dataId,
  //     updateDto,
  //     this.productCodeRepository,
  //     this.productTypeRepository,
  //     this.uomRepository,
  //   );
  //   await productUpdate.execute();
  //   return productUpdate.getResult();
  // }

  // async delete(id: string): Promise<IBatchResult> {
  //   const productDelete = new ProductDelete(
  //     this.connection,
  //     this.productRepository,
  //     id
  //   );
  //   await productDelete.execute();
  //   return productDelete.getResult();
  // }

  // async getLastCode(): Promise<{code: string}> {
  //   const productGetLastCode = new ProductGetLastCode(
  //     this.productRepository,
  //     this.productCodeRepository,
  //   )
  //   await productGetLastCode.execute();
  //   return productGetLastCode.getResult();
  // }
}
