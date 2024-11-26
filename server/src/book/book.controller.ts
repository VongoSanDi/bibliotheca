import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dto/PageOptionsDto';
import { PaginatedResult } from 'src/common/types/response';
import { BookResponseDto } from './dto/retrieve-book';
import { ApiPaginationQuery } from 'src/common/decorators/pagination.decorator';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get('search')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Retrieve books by filter' })
  @ApiQuery({
    name: 'title',
    description: 'The title of the book',
    required: false,
  })
  @ApiQuery({
    name: 'author_id',
    description: 'The id of the author in the db',
    required: false,
  })
  @ApiPaginationQuery()
  async searchBooks(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('title') title?: string,
    @Query('author_id') author_id?: number,
  ): Promise<PaginatedResult<BookResponseDto>> {
    console.log('title', title);
    const dto = {
      title,
      author_id,
    };
    console.log('dto', dto);

    const { results, itemCount } = await this.bookService.findByFilters(
      dto,
      pageOptionsDto,
    );
    return {
      results,
      itemCount,
      pageOptionsDto,
    };
  }

  @Get('isbn/:isbn')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Retrieve a book by his ISBN' })
  @ApiPaginationQuery()
  async searchBook(
    @Param('isbn') isbn: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PaginatedResult<BookResponseDto>> {
    const dto = {
      isbn: isbn,
    };
    const { results, itemCount } = await this.bookService.findByIsbn(
      dto,
      pageOptionsDto,
    );

    return {
      results,
      pageOptionsDto,
      itemCount,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
