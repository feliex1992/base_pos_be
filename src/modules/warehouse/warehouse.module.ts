import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseController } from './controller/warehouse.controller';
import { Warehouse } from './data/entities/warehouse.entity';
import { WarehouseRepository } from './data/warehouse.repository';
import { WarehouseService } from './domain/warehouse.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Warehouse]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService, WarehouseRepository]
})
export class WarehouseModule {}
