import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Serie } from './entities/serie.entity';
import {
  SerieResponseDto,
} from './dto/retrieve-serie.dto';
import { ValidateSchema } from 'src/common/utils/validators';
import { SerieByTitleResponseSchema } from './schemas/serie.schema';
import { SerieMapper } from './mappers/serie-mapper';
import { PageOptionsDto } from 'src/common/dto/PageOptionsDto';
import { PageOptionsSchema } from 'src/common/schemas/common';

@Injectable()
export class SerieService {
  constructor(
    @InjectRepository(Serie)
    private readonly serieRepository: Repository<Serie>,
  ) { }
  create(createSerieDto: CreateSerieDto) {
    return 'This action adds a new serie';
  }

  findAll() {
    return `This action returns all serie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serie`;
  }

  async findByTitle(serie_title: string, pageOptionsDto: PageOptionsDto): Promise<{ results: SerieResponseDto[]; itemCount: number }> {
    const validatedDto = ValidateSchema<string>(
      SerieByTitleResponseSchema,
      serie_title,
    );

    const validatedPageOptions = ValidateSchema<PageOptionsDto>(PageOptionsSchema, pageOptionsDto)
    const { take, skip, order, orderBy } = validatedPageOptions;

    const [series, itemCount] = await this.serieRepository.findAndCount({
      where: {
        serie_title: ILike(`%${validatedDto}%`)
      },
      take: take,
      skip: skip,
      order: { [orderBy]: order },
    });

    if (itemCount === 0) {
      throw new NotFoundException(`No series found with title containing: ${serie_title}`);
    }

    const seriesMapped = series.map((serie) => SerieMapper.toResponseDto(serie))

    return {
      results: seriesMapped, itemCount
    }
  }

  update(id: number, updateSerieDto: UpdateSerieDto) {
    return `This action updates a #${id} serie`;
  }

  remove(id: number) {
    return `This action removes a #${id} serie`;
  }
}
