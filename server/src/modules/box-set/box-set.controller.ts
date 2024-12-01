import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoxSetService } from './box-set.service';
import { CreateBoxSetDto } from './dto/create-box-set.dto';
import { UpdateBoxSetDto } from './dto/update-box-set.dto';

@Controller('box-set')
export class BoxSetController {
  constructor(private readonly boxSetService: BoxSetService) {}

  @Post()
  create(@Body() createBoxSetDto: CreateBoxSetDto) {
    return this.boxSetService.create(createBoxSetDto);
  }

  @Get()
  findAll() {
    return this.boxSetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boxSetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoxSetDto: UpdateBoxSetDto) {
    return this.boxSetService.update(+id, updateBoxSetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boxSetService.remove(+id);
  }
}
