import { Injectable } from '@nestjs/common';
import { CreateBookTitleTranslationDto } from './dto/create-book-title-translation.dto';
import { UpdateBookTitleTranslationDto } from './dto/update-book-title-translation.dto';

@Injectable()
export class BookTitleTranslationService {
  create(createBookTitleTranslationDto: CreateBookTitleTranslationDto) {
    return 'This action adds a new bookTitleTranslation';
  }

  findAll() {
    return `This action returns all bookTitleTranslation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookTitleTranslation`;
  }

  update(id: number, updateBookTitleTranslationDto: UpdateBookTitleTranslationDto) {
    return `This action updates a #${id} bookTitleTranslation`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookTitleTranslation`;
  }
}
