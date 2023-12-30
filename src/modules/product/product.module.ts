import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from '../product-type/data/entities/product-type.entity';
import { ProductTypeRepository } from '../product-type/data/product-type.repository';
import { Uom } from '../uom/data/entities/uom.entity';
import { UomRepository } from '../uom/data/uom.repository';
import { ProductController } from './controller/product.controller';
import { ProductCode } from './data/entities/product-code.entity';
import { Product } from './data/entities/product.entity';
import { ProductCodeRepository } from './data/product-code.repository';
import { ProductRepository } from './data/product.repository';
import { ProductService } from './domain/product.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      Product,
      ProductCode,
      ProductType,
      Uom,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    ProductCodeRepository,
    ProductTypeRepository,
    UomRepository,
  ]
})
export class ProductModule {}
