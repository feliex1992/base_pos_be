import { Test, TestingModule } from '@nestjs/testing';
import { StockCardService } from './stock-card.service';

describe('StockService', () => {
  let service: StockCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockCardService],
    }).compile();

    service = module.get<StockCardService>(StockCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
