import { Test, TestingModule } from '@nestjs/testing';
import { BoxSetBookService } from './box-set-book.service';

describe('BoxSetBookService', () => {
  let service: BoxSetBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoxSetBookService],
    }).compile();

    service = module.get<BoxSetBookService>(BoxSetBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
