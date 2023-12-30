import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictRepository } from './data/district.repository';
import { District } from './data/entities/district.entity';
import { Province } from './data/entities/province.entity';
import { SubDistrict } from './data/entities/sub-district.entity';
import { Village } from './data/entities/village.entity';
import { ProvinceRepository } from './data/province.repository';
import { SubDistrictRepository } from './data/sub-district.repository';
import { VillageRepository } from './data/village.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
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
  controllers: [],
  providers: [
    ProvinceRepository,
    DistrictRepository,
    SubDistrictRepository,
    VillageRepository,
  ]
})
export class AreaModule {}
