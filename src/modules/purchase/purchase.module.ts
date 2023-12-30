import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigSystemRepository } from '../config-system/data/config-system.repository';
import { ConfigSystem } from '../config-system/data/entities/config-system.entity';
import { Product } from '../product/data/entities/product.entity';
import { StockCard } from '../stock/data/entities/stock-card.entity';
import { ProductRepository } from '../product/data/product.repository';
import { StockCardRepository } from '../stock/data/stock-card.repository';
import { Supplier } from '../supplier/data/entities/supplier.entity';
import { SupplierRepository } from '../supplier/data/supplier.repository';
import { Uom } from '../uom/data/entities/uom.entity';
import { UomRepository } from '../uom/data/uom.repository';
import { Warehouse } from '../warehouse/data/entities/warehouse.entity';
import { WarehouseRepository } from '../warehouse/data/warehouse.repository';
import { PurchaseController } from './controller/purchase.controller';
import { PurchaseDetail } from './data/entities/purchase-detail.entity';
import { Purchase } from './data/entities/purchase.entity';
import { PurchaseRepository } from './data/purchase.repository';
import { PurchaseService } from './domain/purchase.service';
import { Stock } from '../stock/data/entities/stock.entity';
import { StockRepository } from '../stock/data/stock.repository';
import { StockFifo } from '../stock/data/entities/stock-fifo.entity';
import { StockFifoRepository } from '../stock/data/stock-fifo.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      Purchase,
      PurchaseDetail,
      Supplier,
      Product,
      Uom,
      Stock,
      StockCard,
      StockFifo,
      ConfigSystem,
      Warehouse,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [PurchaseController],
  providers: [
    PurchaseService,
    PurchaseRepository,
    SupplierRepository,
    ProductRepository,
    UomRepository,
    StockRepository,
    StockCardRepository,
    StockFifoRepository,
    ConfigSystemRepository,
    WarehouseRepository,
  ]
})
export class PurchaseModule {}
