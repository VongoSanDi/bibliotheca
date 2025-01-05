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

  async findOneByTitle(serie_title: string): Promise<SerieResponseDto> {
    const validatedDto = ValidateSchema<string>(
      SerieByTitleResponseSchema,
      serie_title,
    );

    const result = await this.serieRepository.findOneBy({
      serie_title: ILike(`%${validatedDto}%`),
    });

    if (!result) {
      throw new NotFoundException(
        `Serie with title ${validatedDto} not found`,
      );
    }

    return SerieMapper.toResponseDto(result);
  }

  update(id: number, updateSerieDto: UpdateSerieDto) {
    return `This action updates a #${id} serie`;
  }

  remove(id: number) {
    return `This action removes a #${id} serie`;
  }
}
