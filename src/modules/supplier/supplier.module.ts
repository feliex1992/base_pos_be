import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierController } from './controller/supplier.controller';
import { Supplier } from './data/entities/supplier.entity';
import { SupplierRepository } from './data/supplier.repository';
import { SupplierService } from './domain/supplier.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Supplier]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [SupplierController],
  providers: [SupplierService, SupplierRepository]
})
export class SupplierModule {}
