import { Test, TestingModule } from '@nestjs/testing';
import { ConfigSystemService } from '../domain/config-system.service';
import { ConfigSystemController } from './config-system.controller';

describe('ConfigSystemController', () => {
  let controller: ConfigSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigSystemController],
      providers: [ConfigSystemService],
    }).compile();

    controller = module.get<ConfigSystemController>(ConfigSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
