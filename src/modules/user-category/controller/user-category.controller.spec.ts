import { Test, TestingModule } from '@nestjs/testing';
import { UserCategoryService } from '../domain/user-category.service';
import { UserCategoryController } from './user-category.controller';

describe('UserCategoryController', () => {
  let controller: UserCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCategoryController],
      providers: [UserCategoryService],
    }).compile();

    controller = module.get<UserCategoryController>(UserCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
