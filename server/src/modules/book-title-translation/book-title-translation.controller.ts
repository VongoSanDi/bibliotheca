import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { BookTitleTranslationService } from './book-title-translation.service';
import { CreateBookTitleTranslationDto } from './dto/create-book-title-translation.dto';
import { UpdateBookTitleTranslationDto } from './dto/update-book-title-translation.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import {
  BookTitleTranslationResponseDto,
  RetrieveBookTitleTranslationDto,
} from './dto/retrieve-book-title-translation.dto';

@Controller('book-title-translation')
export class BookTitleTranslationController {
  constructor(
    private readonly bookTitleTranslationService: BookTitleTranslationService,
  ) {}

  @Post()
  create(@Body() createBookTitleTranslationDto: CreateBookTitleTranslationDto) {
    return this.bookTitleTranslationService.create(
      createBookTitleTranslationDto,
    );
  }

  @Get(':languageId/:bookId')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Retrieve the translated title of a book' })
  @ApiResponse({ status: 200, type: BookTitleTranslationResponseDto })
  @ApiParam({
    name: 'languageId',
    required: true,
    type: Number,
    description: 'Language ID',
  })
  @ApiParam({
    name: 'bookId',
    required: true,
    type: Number,
    description: 'Book ID',
  })
  async findOneBookTitleTranslattion(
    @Param('languageId', ParseIntPipe) languageId: number,
    @Param('bookId', ParseIntPipe) bookId: number,
  ): Promise<BookTitleTranslationResponseDto> {
    const dto: RetrieveBookTitleTranslationDto = {
      language_id: languageId,
      book_id: bookId,
    };
    return await this.bookTitleTranslationService.findOneBookTitleTranslation(
      dto,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookTitleTranslationDto: UpdateBookTitleTranslationDto,
  ) {
    return this.bookTitleTranslationService.update(
      +id,
      updateBookTitleTranslationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookTitleTranslationService.remove(+id);
  }
}
