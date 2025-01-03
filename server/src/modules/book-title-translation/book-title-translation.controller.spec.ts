import { Test, TestingModule } from '@nestjs/testing';
import { BookTitleTranslationController } from './book-title-translation.controller';
import { BookTitleTranslationService } from './book-title-translation.service';

describe('BookTitleTranslationController', () => {
  let controller: BookTitleTranslationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookTitleTranslationController],
      providers: [BookTitleTranslationService],
    }).compile();

    controller = module.get<BookTitleTranslationController>(BookTitleTranslationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
