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
import { PageOptionsDto } from 'src/common/dto/PageOptionsDto';
import { RetrieveUserCollectionSchema } from './schemas/retrieve-collection-schema';
import { UserCollectionMapper } from './mappers/collection-mappers';
import { PageOptionsSchema } from 'src/common/schemas/common';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(UserCollection)
    private readonly userCollectionRepository: Repository<UserCollection>,
  ) { }

  create(createCollectionDto: CreateCollectionDto) {
    return 'This action adds a new collection';
  }

  async findAll(): Promise<UserCollectionResponseDto[]> {
    const response = await this.userCollectionRepository.find();
    return response;
  }

  async findOne(
    dto: RetrieveCollectionDto,
    pageOptionsDto: PageOptionsDto,
  ): Promise<{ results: UserCollectionResponseDto[]; itemCount: number }> {
    try {
      const validatedDto = ValidateSchema<RetrieveCollectionDto>(
        RetrieveUserCollectionSchema,
        dto,
      );
      const validatedPageOptions = ValidateSchema<PageOptionsDto>(
        PageOptionsSchema,
        pageOptionsDto,
      );
      const { take, skip, order, orderBy } = validatedPageOptions;

      const { user_id } = validatedDto;
      const [collection, itemCount] =
        await this.userCollectionRepository.findAndCount({
          where: { user_id },
          take: take,
          skip: skip,
          order: { [orderBy]: order },
        });

      if (!collection || itemCount === 0) {
        throw new NotFoundException(
          `No collection found for user with id ${user_id}`,
        );
      }
      const collectionMapped = collection.map((collection) =>
        UserCollectionMapper.toResponseDto(collection),
      );
      return { results: collectionMapped, itemCount: itemCount };
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
