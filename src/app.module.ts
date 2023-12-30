import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './base/auth/jwt.strategy';
import { UserCategory } from './modules/user-category/data/entities/user-category.entity';
import { UserCategoryModule } from './modules/user-category/user-category.module';
import { User } from './modules/user/data/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { ProductCategory } from './modules/product-category/data/entities/product-category.entity';
import { ProductType } from './modules/product-type/data/entities/product-type.entity';
import { ProductTypeModule } from './modules/product-type/product-type.module';
import { UomModule } from './modules/uom/uom.module';
import { Uom } from './modules/uom/data/entities/uom.entity';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { Warehouse } from './modules/warehouse/data/entities/warehouse.entity';
import { SupplierModule } from './modules/supplier/supplier.module';
import { Supplier } from './modules/supplier/data/entities/supplier.entity';
import { ProductModule } from './modules/product/product.module';
import { Product } from './modules/product/data/entities/product.entity';
import { ProductCode } from './modules/product/data/entities/product-code.entity';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { Purchase } from './modules/purchase/data/entities/purchase.entity';
import { PurchaseDetail } from './modules/purchase/data/entities/purchase-detail.entity';
import { ConfigSystemModule } from './modules/config-system/config-system.module';
import { ConfigSystem } from './modules/config-system/data/entities/config-system.entity';
import { StockCard } from './modules/stock/data/entities/stock-card.entity';
import { StockModule } from './modules/stock/stock.module';
import { Stock } from './modules/stock/data/entities/stock.entity';
import { StockFifo } from './modules/stock/data/entities/stock-fifo.entity';
import { CustomerModule } from './modules/customer/customer.module';
import { AreaModule } from './modules/area/area.module';
import { Province } from './modules/area/data/entities/province.entity';
import { District } from './modules/area/data/entities/district.entity';
import { SubDistrict } from './modules/area/data/entities/sub-district.entity';
import { Customer } from './modules/customer/data/entities/customer.entity';
import { SaleModule } from './modules/sale/sale.module';
import { Village } from './modules/area/data/entities/village.entity';
import { SaleDetail } from './modules/sale/data/entities/sale-detail.entity';
import { Sale } from './modules/sale/data/entities/sale.entity';
import { CashModule } from './modules/cash/cash.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.RETAIL_DB_HOST,
      port: parseInt(process.env.RETAIL_DB_PORT),
      username: process.env.RETAIL_DB_USER,
      password: process.env.RETAIL_DB_PASS,
      database: process.env.RETAIL_DB_NAME,
      entities: [
        Province,
        District,
        SubDistrict,
        Village,
        ConfigSystem,
        User,
        UserCategory,
        ProductCategory,
        ProductType,
        Uom,
        Warehouse,
        Supplier,
        Customer,
        Product,
        Stock,
        StockCard,
        StockFifo,
        ProductCode,
        Purchase,
        PurchaseDetail,
        Sale,
        SaleDetail
      ],
      ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
    }),
    AreaModule,
    UserCategoryModule,
    UserModule,
    ProductCategoryModule,
    ProductTypeModule,
    UomModule,
    WarehouseModule,
    SupplierModule,
    ProductModule,
    PurchaseModule,
    ConfigSystemModule,
    StockModule,
    CustomerModule,
    SaleModule,
    CashModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
