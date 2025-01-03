import { Module } from '@nestjs/common';
import { BookTitleTranslationService } from './book-title-translation.service';
import { BookTitleTranslationController } from './book-title-translation.controller';

@Module({
  controllers: [BookTitleTranslationController],
  providers: [BookTitleTranslationService],
})
export class BookTitleTranslationModule {}
