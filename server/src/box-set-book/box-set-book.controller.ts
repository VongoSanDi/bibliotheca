import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoxSetBookService } from './box-set-book.service';
import { CreateBoxSetBookDto } from './dto/create-box-set-book.dto';
import { UpdateBoxSetBookDto } from './dto/update-box-set-book.dto';

@Controller('box-set-book')
export class BoxSetBookController {
  constructor(private readonly boxSetBookService: BoxSetBookService) {}

  @Post()
  create(@Body() createBoxSetBookDto: CreateBoxSetBookDto) {
    return this.boxSetBookService.create(createBoxSetBookDto);
  }

  @Get()
  findAll() {
    return this.boxSetBookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boxSetBookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoxSetBookDto: UpdateBoxSetBookDto) {
    return this.boxSetBookService.update(+id, updateBoxSetBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boxSetBookService.remove(+id);
  }
}
