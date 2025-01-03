import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookTitleTranslationService } from './book-title-translation.service';
import { CreateBookTitleTranslationDto } from './dto/create-book-title-translation.dto';
import { UpdateBookTitleTranslationDto } from './dto/update-book-title-translation.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookTitleTranslationResponseDto } from './dto/retrieve-book-title-translation.dto';

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

  @Get(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Retrive the translated title of a book' })
  @ApiResponse({ status: 200, type: BookTitleTranslationResponseDto })
  async findOneBookTitleTranslattion(
    @Param('id') id: number,
  ): Promise<BookTitleTranslationResponseDto> {
    return await this.bookTitleTranslationService.findOneBookTitleTranslation(
      +id,
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
