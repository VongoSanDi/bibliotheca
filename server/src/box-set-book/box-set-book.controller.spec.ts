import { Test, TestingModule } from '@nestjs/testing';
import { BoxSetBookController } from './box-set-book.controller';
import { BoxSetBookService } from './box-set-book.service';

describe('BoxSetBookController', () => {
  let controller: BoxSetBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoxSetBookController],
      providers: [BoxSetBookService],
    }).compile();

    controller = module.get<BoxSetBookController>(BoxSetBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
