import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookResponseDto, RetrieveBookDto } from './dto/retrieve-book';
import { PageOptionsDto } from 'src/common/dto/PageOptionsDto';
import { ValidateSchema } from 'src/common/utils/validators';
import { PageOptionsSchema } from 'src/common/schemas/common';
import { BookResponseSchema } from './schemas/book.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { BookMapper } from 'src/common/mappers/book-mapper';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}
  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  async findAll(
    dto: RetrieveBookDto,
    pageOptionsDto: PageOptionsDto,
  ): Promise<{ results: BookResponseDto[]; itemCount: number }> {
    try {
      const validateDto = ValidateSchema<RetrieveBookDto>(
        BookResponseSchema,
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
      const bookMapped = books.map((book) => BookMapper.toResponseDto(book));

      return {
        results: bookMapped,
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
