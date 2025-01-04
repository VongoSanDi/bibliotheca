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
import { SerieTitleTranslationService } from './serie-title-translation.service';
import { CreateSerieTitleTranslationDto } from './dto/create-serie-title-translation.dto';
import { UpdateSerieTitleTranslationDto } from './dto/update-serie-title-translation.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import {
  RetrieveSerieTitleTranslationDto,
  SerieTitleTranslationResponseDto,
} from './dto/retrieve-serie-title-translation.dto';

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

  @Get()
  findAll() {
    return this.serieTitleTranslationService.findAll();
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
    required: true,
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
