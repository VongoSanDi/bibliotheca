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
