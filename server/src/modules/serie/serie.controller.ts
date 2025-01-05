import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SerieService } from './serie.service';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { SerieResponseDto } from './dto/retrieve-serie.dto';

@Controller('serie')
export class SerieController {
  constructor(private readonly serieService: SerieService) { }

  @Post()
  create(@Body() createSerieDto: CreateSerieDto) {
    return this.serieService.create(createSerieDto);
  }

  @Get()
  findAll() {
    return this.serieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serieService.findOne(+id);
  }

  @Get(':title')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Retrieve a serie by the title' })
  @ApiResponse({ status: 200, type: SerieResponseDto })
  @ApiParam({
    name: 'title',
    required: true,
    type: String,
    description: 'Serie title',
  })
  async findOneByTitle(
    @Param('title') title: string,
  ): Promise<SerieResponseDto> {
    return await this.serieService.findOneByTitle(title);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSerieDto: UpdateSerieDto) {
    return this.serieService.update(+id, updateSerieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serieService.remove(+id);
  }
}
