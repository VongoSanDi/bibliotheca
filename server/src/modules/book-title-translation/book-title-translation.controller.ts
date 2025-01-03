import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookTitleTranslationService } from './book-title-translation.service';
import { CreateBookTitleTranslationDto } from './dto/create-book-title-translation.dto';
import { UpdateBookTitleTranslationDto } from './dto/update-book-title-translation.dto';

@Controller('book-title-translation')
export class BookTitleTranslationController {
  constructor(private readonly bookTitleTranslationService: BookTitleTranslationService) {}

  @Post()
  create(@Body() createBookTitleTranslationDto: CreateBookTitleTranslationDto) {
    return this.bookTitleTranslationService.create(createBookTitleTranslationDto);
  }

  @Get()
  findAll() {
    return this.bookTitleTranslationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookTitleTranslationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookTitleTranslationDto: UpdateBookTitleTranslationDto) {
    return this.bookTitleTranslationService.update(+id, updateBookTitleTranslationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookTitleTranslationService.remove(+id);
  }
}
