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
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dto/PageOptionsDto';
import { PaginatedResult } from 'src/common/types/response';
import { BookResponseDto } from './dto/retrieve-book';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get(':isbn')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Retrieve all books' })
  async findAll(
    @Param('isbn') isbn: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PaginatedResult<BookResponseDto>> {
    const dto = {
      isbn: isbn,
    };
    const { results, itemCount } = await this.bookService.findAll(
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
