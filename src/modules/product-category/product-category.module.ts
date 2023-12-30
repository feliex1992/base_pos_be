import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryController } from './controller/product-category.controller';
import { ProductCategory } from './data/entities/product-category.entity';
import { ProductCategoryRepository } from './data/product-category.repository';
import { ProductCategoryService } from './domain/product-category.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ProductCategory]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, ProductCategoryRepository]
})
export class ProductCategoryModule {}
