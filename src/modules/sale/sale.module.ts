import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from '../customer/data/customer.repository';
import { Customer } from '../customer/data/entities/customer.entity';
import { Product } from '../product/data/entities/product.entity';
import { ProductRepository } from '../product/data/product.repository';
import { StockCard } from '../stock/data/entities/stock-card.entity';
import { StockFifo } from '../stock/data/entities/stock-fifo.entity';
import { Stock } from '../stock/data/entities/stock.entity';
import { StockCardRepository } from '../stock/data/stock-card.repository';
import { StockFifoRepository } from '../stock/data/stock-fifo.repository';
import { StockRepository } from '../stock/data/stock.repository';
import { Uom } from '../uom/data/entities/uom.entity';
import { UomRepository } from '../uom/data/uom.repository';
import { Warehouse } from '../warehouse/data/entities/warehouse.entity';
import { WarehouseRepository } from '../warehouse/data/warehouse.repository';
import { SaleController } from './controller/sale.controller';
import { SaleDetail } from './data/entities/sale-detail.entity';
import { Sale } from './data/entities/sale.entity';
import { SaleRepository } from './data/sale.repository';
import { SaleService } from './domain/sale.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      Sale,
      SaleDetail,
      Customer,
      Product,
      Uom,
      Stock,
      StockCard,
      StockFifo,
      Warehouse,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [SaleController],
  providers: [
    SaleService,
    SaleRepository,
    CustomerRepository,
    ProductRepository,
    UomRepository,
    StockRepository,
    StockCardRepository,
    StockFifoRepository,
    WarehouseRepository,
  ]
})
export class SaleModule {}
