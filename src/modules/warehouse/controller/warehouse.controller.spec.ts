import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseService } from '../domain/warehouse.service';
import { WarehouseController } from './warehouse.controller';

describe('WarehouseController', () => {
  let controller: WarehouseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarehouseController],
      providers: [WarehouseService],
    }).compile();

    controller = module.get<WarehouseController>(WarehouseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
