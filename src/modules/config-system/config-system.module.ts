import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from '../warehouse/data/entities/warehouse.entity';
import { WarehouseRepository } from '../warehouse/data/warehouse.repository';
import { ConfigSystemController } from './controller/config-system.controller';
import { ConfigSystemRepository } from './data/config-system.repository';
import { ConfigSystem } from './data/entities/config-system.entity';
import { ConfigSystemService } from './domain/config-system.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      ConfigSystem,
      Warehouse,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [ConfigSystemController],
  providers: [
    ConfigSystemService,
    ConfigSystemRepository,
    WarehouseRepository,
  ]
})
export class ConfigSystemModule {}
