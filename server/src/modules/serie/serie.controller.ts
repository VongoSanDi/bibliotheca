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
import { SerieService } from './serie.service';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { SerieResponseDto } from './dto/retrieve-serie.dto';
import { PaginatedResult } from 'src/common/types/response';
import { PageOptionsDto } from 'src/common/dto/PageOptionsDto';
import { ApiPaginationQuery } from 'src/common/decorators/pagination.decorator';
import { QueryTransformPipe } from 'src/common/utils/query-transform.pipe';

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

  @Get('title/:serie_title')
  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Retrieve series by title',
    description: 'Search and retrieve series that match the given title with pagination'
  })
  @ApiResponse({
    status: 200,
    description: 'Series found successfully',
    type: SerieResponseDto,
    isArray: true
  })
  @ApiResponse({
    status: 404,
    description: 'No series found with the given title'
  })
  @ApiParam({
    name: 'serie_title',
    required: true,
    type: String,
    description: 'Full or partial series title to search for'
  })
  @ApiPaginationQuery()
  async findByTitle(
    @Param('serie_title') serie_title: string,
    @Query(QueryTransformPipe) pageOptionsDto: PageOptionsDto
  ): Promise<PaginatedResult<SerieResponseDto>> {
    const { results, itemCount } = await this.serieService.findByTitle(serie_title, pageOptionsDto);
    return {
      results,
      itemCount,
      pageOptionsDto,
    };
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
