import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  BookResponseDto,
  RetrieveBookByFiltersDto,
  RetrieveBookByIsbnDto,
} from './dto/retrieve-book';
import { PageOptionsDto } from 'src/common/dto/PageOptionsDto';
import { ValidateSchema } from 'src/common/utils/validators';
import { PageOptionsSchema } from 'src/common/schemas/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { BookMapper } from 'src/common/mappers/book-mapper';
import {
  BookByIsbnResponseSchema,
  RetrieveBookByFiltersSchema,
} from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) { }
  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  async findByIsbn(
    dto: RetrieveBookByIsbnDto,
    pageOptionsDto: PageOptionsDto,
  ): Promise<{ results: BookResponseDto[]; itemCount: number }> {
    try {
      const validateDto = ValidateSchema<RetrieveBookByIsbnDto>(
        BookByIsbnResponseSchema,
        dto,
      );
      const { isbn } = validateDto;
      const validatePageOptions = ValidateSchema<PageOptionsDto>(
        PageOptionsSchema,
        pageOptionsDto,
      );
      const { take, skip, order, orderBy } = validatePageOptions;

      const [books, itemCount] = await this.bookRepository.findAndCount({
        where: { isbn },
        take: take,
        skip: skip,
        order: { [orderBy]: order },
      });
      const booksMapped = books.map((book) => BookMapper.toResponseDto(book));

      return {
        results: booksMapped,
        itemCount,
      };
    } catch (e) {
      throw e;
    }
  }

  async findByFilters(
    dto: RetrieveBookByFiltersDto,
    pageOptionsDto: PageOptionsDto,
  ): Promise<{ results: BookResponseDto[]; itemCount: number }> {
    try {
      const validateDto = ValidateSchema<RetrieveBookByFiltersDto>(
        RetrieveBookByFiltersSchema,
        dto,
      );
      const { title, author } = validateDto;
      const validatePageOptions = ValidateSchema<PageOptionsDto>(
        PageOptionsSchema,
        pageOptionsDto,
      );
      const { take, skip, order, orderBy } = validatePageOptions;

      // We want to query one column, the user must choose which one via the param, if he send a title we will search only in the title column
      const whereCondition: any = {};
      if (title) {
        whereCondition.original_title = ILike(`%${title}%`);
      } else if (author) {
        whereCondition.author_id = ILike(`%${author}%`);
      }
      console.log('where', whereCondition);

      const [books, itemCount] = await this.bookRepository.findAndCount({
        where: whereCondition,
        take: take,
        skip: skip,
        order: { [orderBy]: order },
      });
      const booksMapped = books.map((book) => BookMapper.toResponseDto(book));
      return {
        results: booksMapped,
        itemCount,
      };
    } catch (e) {
      throw e;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
