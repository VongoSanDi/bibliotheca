import { Test, TestingModule } from '@nestjs/testing';
import { BoxSetService } from './box-set.service';

describe('BoxSetService', () => {
  let service: BoxSetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoxSetService],
    }).compile();

    service = module.get<BoxSetService>(BoxSetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
