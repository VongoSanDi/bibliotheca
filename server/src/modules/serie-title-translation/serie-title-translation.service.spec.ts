import { Test, TestingModule } from '@nestjs/testing';
import { SerieTitleTranslationService } from './serie-title-translation.service';

describe('SerieTitleTranslationService', () => {
  let service: SerieTitleTranslationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SerieTitleTranslationService],
    }).compile();

    service = module.get<SerieTitleTranslationService>(SerieTitleTranslationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
