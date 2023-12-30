import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from '../product-category/data/entities/product-category.entity';
import { ProductCategoryRepository } from '../product-category/data/product-category.repository';
import { ProductTypeController } from './controller/product-type.controller';
import { ProductType } from './data/entities/product-type.entity';
import { ProductTypeRepository } from './data/product-type.repository';
import { ProductTypeService } from './domain/product-type.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ProductType, ProductCategory]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [ProductTypeController],
  providers: [ProductTypeService, ProductTypeRepository, ProductCategoryRepository]
})
export class ProductTypeModule {}
