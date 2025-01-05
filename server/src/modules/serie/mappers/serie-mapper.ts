import { SerieResponseDto } from '../dto/retrieve-serie.dto';
import { Serie } from '../entities/serie.entity';

export class SerieMapper {
  static toResponseDto(serie: Serie): SerieResponseDto {
    return new SerieResponseDto({
      id: serie.id,
      author_id: serie.author_id,
      description: serie.description,
      genre_id: serie.genre_id,
      original_language_id: serie.original_language_id,
      original_volumes_count: serie.original_volumes_count,
      publication_start_date: serie.publication_start_date,
      publication_end_date: serie.publication_end_date,
      publisher_id: serie.publisher_id,
      serie_title: serie.serie_title,
      status_id: serie.status_id,
      translated_volumes_count: serie.translated_volumes_count,
    });
  }
}
