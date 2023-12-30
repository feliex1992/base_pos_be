import { Module } from '@nestjs/common';
import { CashController } from './controller/cash.controller';
import { CashService } from './domain/cash.service';

@Module({
  controllers: [CashController],
  providers: [CashService]
})
export class CashModule {}
