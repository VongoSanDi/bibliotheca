import { SerieTitleTranslationResponseDto } from 'src/modules/serie-title-translation/dto/retrieve-serie-title-translation.dto';
import { SerieTitleTranslation } from 'src/modules/serie-title-translation/entities/serie-title-translation.entity';

export class SerieTitleTranslationMapper {
  static toResponseDto(
    serieTitleTranslation: SerieTitleTranslation,
  ): SerieTitleTranslationResponseDto {
    return new SerieTitleTranslationResponseDto({
      id: serieTitleTranslation.id,
      serie_id: serieTitleTranslation.serie_id,
      translated_title: serieTitleTranslation.translated_title,
      language_id: serieTitleTranslation.language_id,
    });
  }
}
