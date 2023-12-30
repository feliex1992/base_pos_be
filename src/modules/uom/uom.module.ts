import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UomController } from './controller/uom.controller';
import { Uom } from './data/entities/uom.entity';
import { UomRepository } from './data/uom.repository';
import { UomService } from './domain/uom.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Uom]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [UomController],
  providers: [UomService, UomRepository]
})
export class UomModule {}
