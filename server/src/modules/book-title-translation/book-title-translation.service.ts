import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookTitleTranslationDto } from './dto/create-book-title-translation.dto';
import { UpdateBookTitleTranslationDto } from './dto/update-book-title-translation.dto';
import {
  BookTitleTranslationResponseDto,
  RetrieveBookTitleTranslationDto,
} from './dto/retrieve-book-title-translation.dto';
import { ValidateSchema } from 'src/common/utils/validators';
import { InjectRepository } from '@nestjs/typeorm';
import { BookTitleTranslation } from './entities/book-title-translation.entity';
import { Repository } from 'typeorm';
import { BookTitleTranslationMapper } from 'src/common/mappers/book-title-translation.mapper';
import { BookTitleTranslationSchema } from './schemas/book-title-translation.schema';

@Injectable()
export class BookTitleTranslationService {
  constructor(
    @InjectRepository(BookTitleTranslation)
    private readonly bookTitleTranslationRepository: Repository<BookTitleTranslation>,
  ) {}
  create(createBookTitleTranslationDto: CreateBookTitleTranslationDto) {
    return 'This action adds a new bookTitleTranslation';
  }

  async findOneBookTitleTranslation(
    dto: RetrieveBookTitleTranslationDto,
  ): Promise<BookTitleTranslationResponseDto> {
    const validatedDto = ValidateSchema<RetrieveBookTitleTranslationDto>(
      BookTitleTranslationSchema,
      dto,
    );

    const result = await this.bookTitleTranslationRepository.findOneBy({
      language_id: validatedDto.language_id,
      book_id: validatedDto.book_id,
    });

    if (!result) {
      throw new NotFoundException(
        `Book with ID ${validatedDto.book_id} and with the language ID ${validatedDto.language_id} not found`,
      );
    }
    return BookTitleTranslationMapper.toResponseDto(result);
  }

  findAll() {
    return `This action returns all bookTitleTranslation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookTitleTranslation`;
  }

  update(
    id: number,
    updateBookTitleTranslationDto: UpdateBookTitleTranslationDto,
  ) {
    return `This action updates a #${id} bookTitleTranslation`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookTitleTranslation`;
  }
}
