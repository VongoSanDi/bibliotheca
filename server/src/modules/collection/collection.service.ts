import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCollection } from './entities/user-collection.view-entity';
import {
  RetrieveCollectionDto,
  UserCollectionResponseDto,
} from './dto/retrieve-collection.dto';
import { ValidateSchema } from 'src/common/utils/validators';
import { PageMetaDto, PageOptionsDto } from 'src/common/dto/PageOptionsDto';
import { RetrieveUserCollectionSchema } from './schemas/RetrieveCollectionSchema';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(UserCollection)
    private readonly userCollectionRepository: Repository<UserCollection>,
  ) {}

  create(createCollectionDto: CreateCollectionDto) {
    return 'This action adds a new collection';
  }

  async findAll(): Promise<UserCollectionResponseDto[]> {
    // return `This action returns all collection`;
    const response = await this.userCollectionRepository.find();
    console.log('findAll.response', response);

    return response;
  }

  async findOne(
    dto: RetrieveCollectionDto,
    pageOptionsDto: PageOptionsDto,
  ): Promise<{ data: UserCollectionResponseDto; meta: PageMetaDto }> {
    try {
      const validateDto = ValidateSchema<RetrieveCollectionDto>(
        RetrieveUserCollectionSchema,
        dto,
      );
      const { id } = validateDto;
      const [collection, itemCount] =
        await this.userCollectionRepository.findAndCount({
          where: { id },
          take: pageOptionsDto.take,
          skip: pageOptionsDto.skip,
        });

      if (!collection || itemCount === 0) {
        throw new NotFoundException(
          `No collection found for user with id ${id}`,
        );
      }
      const pageMetaDto = new PageMetaDto(pageOptionsDto, itemCount);
      return { collection, pageMetaDto };
    } catch (e) {
      throw e;
    }
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
