import { Test, TestingModule } from '@nestjs/testing';
import { CollectionVolumeController } from './collection-volume.controller';
import { CollectionVolumeService } from './collection-volume.service';

describe('CollectionVolumeController', () => {
  let controller: CollectionVolumeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionVolumeController],
      providers: [CollectionVolumeService],
    }).compile();

    controller = module.get<CollectionVolumeController>(CollectionVolumeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
