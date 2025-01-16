import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SerieTitleTranslationService } from './serie-title-translation.service';
import { CreateSerieTitleTranslationDto } from './dto/create-serie-title-translation.dto';
import { UpdateSerieTitleTranslationDto } from './dto/update-serie-title-translation.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import {
  RetrieveSerieTitleTranslationDto,
  SerieTitleTranslationResponseDto,
} from './dto/retrieve-serie-title-translation.dto';
import { PaginatedResponse } from 'src/common/types/response';
import { PageOptionsDto } from 'src/common/dto/PageOptionsDto';
import { ApiPaginationQuery } from 'src/common/decorators/pagination.decorator';
import { QueryTransformPipe } from 'src/common/utils/query-transform.pipe';

@Controller('serie-title-translation')
export class SerieTitleTranslationController {
  constructor(
    private readonly serieTitleTranslationService: SerieTitleTranslationService,
  ) { }

  @Post()
  create(
    @Body() createSerieTitleTranslationDto: CreateSerieTitleTranslationDto,
  ) {
    return this.serieTitleTranslationService.create(
      createSerieTitleTranslationDto,
    );
  }

  // @Get()
  // findAll() {
  //   return this.serieTitleTranslationService.findAll();
  // }

  @Get()
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Retrieve the translated title of the series' })
  @ApiQuery({
    name: 'serie_id',
    description: 'The serie id we are looking for',
    required: false,
  })
  @ApiQuery({
    name: 'translated_title',
    description: 'Full or partial serie title to search for',
    required: false,
  })
  @ApiPaginationQuery()
  @ApiResponse({
    status: 200,
    type: SerieTitleTranslationResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No series found with the given parameter'
  })
  async findSeries(
    @Query(QueryTransformPipe) pageOptionsDto: PageOptionsDto,
    @Query('serie_id') serie_id?: number,
    @Query('translated_title') translated_title?: string)
    : Promise<PaginatedResponse<SerieTitleTranslationResponseDto>> {
    const dto = {
      serie_id,
      translated_title
    }

    const { data, itemCount } = await this.serieTitleTranslationService.findSeries(dto, pageOptionsDto)
    return {
      data,
      itemCount,
      pageOptionsDto
    }
  }

  @Get(':languageId/:serieId')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Retrieve the translated title of a serie' })
  @ApiResponse({ status: 200, type: SerieTitleTranslationResponseDto })
  @ApiParam({
    name: 'languageId',
    required: true,
    type: Number,
    description: 'Language ID',
  })
  @ApiParam({
    name: 'serieId',
    required: false,
    type: Number,
    description: 'Serie ID',
  })
  async findOneSerieTitleTranslattion(
    @Param('languageId', ParseIntPipe) languageId: number,
    @Param('serieId', ParseIntPipe) serieId: number,
  ): Promise<SerieTitleTranslationResponseDto> {
    const dto: RetrieveSerieTitleTranslationDto = {
      language_id: languageId,
      serie_id: serieId,
    };
    return await this.serieTitleTranslationService.findOneSerieTitleTranslation(
      dto,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSerieTitleTranslationDto: UpdateSerieTitleTranslationDto,
  ) {
    return this.serieTitleTranslationService.update(
      +id,
      updateSerieTitleTranslationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serieTitleTranslationService.remove(+id);
  }
}
