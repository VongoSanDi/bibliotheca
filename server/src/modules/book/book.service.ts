import { Injectable, NotFoundException } from '@nestjs/common';
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
  ) {}
  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  async findByIsbn(isbn: string): Promise<BookResponseDto> {
    const validatedDto = ValidateSchema<string>(BookByIsbnResponseSchema, isbn);

    const result = await this.bookRepository.findOneBy({
      isbn: validatedDto,
    });

    if (!result) {
      throw new NotFoundException(`Book with ISBN ${validatedDto} not found`);
    }

    return BookMapper.toResponseDto(result);
  }

  async findByFilters(
    dto: RetrieveBookByFiltersDto,
    pageOptionsDto: PageOptionsDto,
  ): Promise<{ results: BookResponseDto[]; itemCount: number }> {
    const validatedDto = ValidateSchema<RetrieveBookByFiltersDto>(
      RetrieveBookByFiltersSchema,
      dto,
    );
    const { title, author_id } = validatedDto;
    const validatedPageOptions = ValidateSchema<PageOptionsDto>(
      PageOptionsSchema,
      pageOptionsDto,
    );
    const { take, skip, order, orderBy } = validatedPageOptions;

    // We want to query one column, the user must choose which one via the param, if he send a title we will search only in the title column
    const whereCondition: any = {};
    if (title) {
      whereCondition.original_title = ILike(`%${title}%`);
    } else if (author_id) {
      whereCondition.author_id = ILike(`%${author_id}%`);
    }

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
