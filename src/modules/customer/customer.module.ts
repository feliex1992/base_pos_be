import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictRepository } from '../area/data/district.repository';
import { District } from '../area/data/entities/district.entity';
import { Province } from '../area/data/entities/province.entity';
import { SubDistrict } from '../area/data/entities/sub-district.entity';
import { Village } from '../area/data/entities/village.entity';
import { ProvinceRepository } from '../area/data/province.repository';
import { SubDistrictRepository } from '../area/data/sub-district.repository';
import { VillageRepository } from '../area/data/village.repository';
import { CustomerController } from './controller/customer.controller';
import { CustomerRepository } from './data/customer.repository';
import { Customer } from './data/entities/customer.entity';
import { CustomerService } from './domain/customer.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      Customer,
      Province,
      District,
      SubDistrict,
      Village,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    CustomerRepository,
    ProvinceRepository,
    DistrictRepository,
    SubDistrictRepository,
    VillageRepository,
  ]
})
export class CustomerModule {}
