import { Test, TestingModule } from '@nestjs/testing';
import { SerieTitleTranslationController } from './serie-title-translation.controller';
import { SerieTitleTranslationService } from './serie-title-translation.service';

describe('SerieTitleTranslationController', () => {
  let controller: SerieTitleTranslationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SerieTitleTranslationController],
      providers: [SerieTitleTranslationService],
    }).compile();

    controller = module.get<SerieTitleTranslationController>(SerieTitleTranslationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
