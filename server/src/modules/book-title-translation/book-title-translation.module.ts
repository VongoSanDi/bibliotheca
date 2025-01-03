import { Module } from '@nestjs/common';
import { BookTitleTranslationService } from './book-title-translation.service';
import { BookTitleTranslationController } from './book-title-translation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookTitleTranslation } from './entities/book-title-translation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookTitleTranslation])],
  controllers: [BookTitleTranslationController],
  providers: [BookTitleTranslationService],
})
export class BookTitleTranslationModule {}
