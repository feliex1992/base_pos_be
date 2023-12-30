import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockCardController } from './controller/stock-card.controller';
import { StockController } from './controller/stock.controller';
import { StockCard } from './data/entities/stock-card.entity';
import { StockFifo } from './data/entities/stock-fifo.entity';
import { Stock } from './data/entities/stock.entity';
import { StockCardRepository } from './data/stock-card.repository';
import { StockRepository } from './data/stock.repository';
import { StockCardService } from './domain/stock-card.service';
import { StockService } from './domain/stock.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      Stock,
      StockCard,
      StockFifo,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [StockController, StockCardController],
  providers: [
    StockService,
    StockCardService,
    StockRepository,
    StockCardRepository,
    StockFifo,
  ]
})
export class StockModule {}
