import { Test, TestingModule } from '@nestjs/testing';
import { BookTitleTranslationService } from './book-title-translation.service';

describe('BookTitleTranslationService', () => {
  let service: BookTitleTranslationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookTitleTranslationService],
    }).compile();

    service = module.get<BookTitleTranslationService>(BookTitleTranslationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
