import { Test, TestingModule } from '@nestjs/testing';
import { StockCardService } from '../domain/stock-card.service';
import { StockCardController } from './stock-card.controller';

describe('StockCardController', () => {
  let controller: StockCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockCardController],
      providers: [StockCardService],
    }).compile();

    controller = module.get<StockCardController>(StockCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
