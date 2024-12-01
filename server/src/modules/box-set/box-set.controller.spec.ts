import { Test, TestingModule } from '@nestjs/testing';
import { BoxSetController } from './box-set.controller';
import { BoxSetService } from './box-set.service';

describe('BoxSetController', () => {
  let controller: BoxSetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoxSetController],
      providers: [BoxSetService],
    }).compile();

    controller = module.get<BoxSetController>(BoxSetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
