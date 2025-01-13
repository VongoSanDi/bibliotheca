import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSerieTitleTranslationDto } from './dto/create-serie-title-translation.dto';
import { UpdateSerieTitleTranslationDto } from './dto/update-serie-title-translation.dto';
import {
  RetrieveSerieTitleTranslationDto,
  SerieTitleTranslationResponseDto,
} from './dto/retrieve-serie-title-translation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SerieTitleTranslation } from './entities/serie-title-translation.entity';
import { Repository } from 'typeorm';
import { ValidateSchema } from 'src/common/utils/validators';
import { SerieTitleTranslationSchema } from './schemas/serie-title-translation.schema';
import { SerieTitleTranslationMapper } from 'src/common/mappers/serie-title-translation.mapper';
import { PageOptionsDto } from 'src/common/dto/PageOptionsDto';
import { PageOptionsSchema } from 'src/common/schemas/common';

@Injectable()
export class SerieTitleTranslationService {
  constructor(
    @InjectRepository(SerieTitleTranslation)
    private readonly serieTitleTranslationRepository: Repository<SerieTitleTranslation>,
  ) { }
  create(createSerieTitleTranslationDto: CreateSerieTitleTranslationDto) {
    return 'This action adds a new serieTitleTranslation';
  }

  findAll() {
    return `This action returns all serieTitleTranslation`;
  }

  async findOneSerieTitleTranslation(
    dto: RetrieveSerieTitleTranslationDto,
  ): Promise<SerieTitleTranslationResponseDto> {
    const validatedDto = ValidateSchema<RetrieveSerieTitleTranslationDto>(
      SerieTitleTranslationSchema,
      dto,
    );

    const result = await this.serieTitleTranslationRepository.findOneBy({
      language_id: validatedDto.language_id,
      serie_id: validatedDto.serie_id,
    });

    if (!result) {
      throw new NotFoundException(
        `Serie with ID ${validatedDto.serie_id} and with the language ID ${validatedDto.language_id} not found`,
      );
    }

    return SerieTitleTranslationMapper.toResponseDto(result);
  }

  findOne(id: number) {
    return `This action returns a #${id} serieTitleTranslation`;
  }

  async findSeries(dto: RetrieveSerieTitleTranslationDto, pageOptionsDto: PageOptionsDto): Promise<{ results: SerieTitleTranslationResponseDto[]; itemCount: number }> {
    const validatedDto = ValidateSchema<SerieTitleTranslationResponseDto>(SerieTitleTranslationSchema, dto)
    const { serie_id, translated_title } = validatedDto

    const validatedPageOptions = ValidateSchema<PageOptionsDto>(PageOptionsSchema, pageOptionsDto)
    const { take, skip, order, orderBy } = validatedPageOptions;

    const whereConditions: string[] = [];
    const parameters: any = {}

    if (serie_id) {
      whereConditions.push('stt.serie_id = :serie_id');
      parameters.serie_id = serie_id;
    }

    if (translated_title) {
      whereConditions.push('LOWER(stt.translated_title) LIKE LOWER(:translated_title)');
      parameters.translated_title = `%${translated_title}%`;
    }

    const whereClause = whereConditions.length > 0
      ? whereConditions.join(' AND ')
      : '1=1';

    const series = await this.serieTitleTranslationRepository
      .createQueryBuilder('stt')
      .select([
        'stt.id',
        'stt.serie_id',
        'stt.translated_title',
        'stt.language_id'
      ])
      .where(whereClause, parameters)
      .take(take)
      .skip(skip)
      .orderBy(`stt.${orderBy}`, order === '0' ? 'ASC' : 'DESC')
      .groupBy('stt.serie_id')
      .getMany();

    const itemCount = await this.serieTitleTranslationRepository
      .createQueryBuilder('stt')
      .select('COUNT(DISTINCT stt.serie_id)', 'count')
      .where(whereClause, parameters)
      .getRawOne()
      .then(result => Number(result.count));

    const seriesMapped = series.map((serie) => SerieTitleTranslationMapper.toResponseDto(serie))

    return {
      results: seriesMapped, itemCount
    }
  }


  update(
    id: number,
    updateSerieTitleTranslationDto: UpdateSerieTitleTranslationDto,
  ) {
    return `This action updates a #${id} serieTitleTranslation`;
  }

  remove(id: number) {
    return `This action removes a #${id} serieTitleTranslation`;
  }
}
