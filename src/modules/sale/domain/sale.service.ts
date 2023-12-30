import { Injectable } from '@nestjs/common';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { CustomerRepository } from 'src/modules/customer/data/customer.repository';
import { ProductRepository } from 'src/modules/product/data/product.repository';
import { StockCardRepository } from 'src/modules/stock/data/stock-card.repository';
import { StockFifoRepository } from 'src/modules/stock/data/stock-fifo.repository';
import { StockRepository } from 'src/modules/stock/data/stock.repository';
import { UomRepository } from 'src/modules/uom/data/uom.repository';
import { WarehouseRepository } from 'src/modules/warehouse/data/warehouse.repository';
import { Connection } from 'typeorm';
import { CreateSaleDto } from '../controller/dto/create-sale.dto';
import { SaleFilterDto } from '../controller/dto/sale-filter.dto';
import { SaleRepository } from '../data/sale.repository';
import { ISale } from './interface/sale.interface';
import { SaleCreate } from './use-case/sale.create';
import { SaleGetMany } from './use-case/sale.get-many';

@Injectable()
export class SaleService {
  constructor(
    private connection: Connection,
    private saleRepository: SaleRepository,
    private customerRepository: CustomerRepository,
    private productRepository: ProductRepository,
    private uomRepository: UomRepository,
    private stockRepository: StockRepository,
    private stockCardRepository: StockCardRepository,
    private stockFifoRepository: StockFifoRepository,
    private warehouseRepository: WarehouseRepository,
  ) {}
  async create(createDto: CreateSaleDto) {
    const saleCreate = new SaleCreate(
      this.connection,
      this.saleRepository,
      createDto,
      this.customerRepository,
      this.productRepository,
      this.uomRepository,
      this.stockRepository,
      this.stockCardRepository,
      this.stockFifoRepository,
      this.warehouseRepository,
    );
    await saleCreate.execute();

    return saleCreate.getResult();
  }

  async getMany(params: SaleFilterDto): Promise<Pagination<ISale, IPaginationMeta>> {
    const saleGetMany = new SaleGetMany(
      this.saleRepository,
      params,
    )
    await saleGetMany.execute();
    return saleGetMany.getResult();
  }
}
