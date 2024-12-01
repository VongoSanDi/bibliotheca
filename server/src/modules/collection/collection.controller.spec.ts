import { Test, TestingModule } from '@nestjs/testing';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';

describe('CollectionController', () => {
  let controller: CollectionController;
  let service: CollectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionController],
      providers: [CollectionService],
    }).compile();

    controller = module.get<CollectionController>(CollectionController);
    service = module.get<CollectionService>(CollectionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a collection depending of an id', () => {
      const mockCollectionResponse = {
        collection_id: 1,
        volume_id: 1,
        user_id: 2,
      };

      const mockRetrieveCollectionDto = {
        user_id: 1,
      };
    });
  });

  describe('findAll', () => {
    it('should return all the collections', async () => {});
  });
});
