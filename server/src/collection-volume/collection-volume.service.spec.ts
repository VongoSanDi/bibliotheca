import { Test, TestingModule } from '@nestjs/testing';
import { CollectionVolumeService } from './collection-volume.service';

describe('CollectionVolumeService', () => {
  let service: CollectionVolumeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionVolumeService],
    }).compile();

    service = module.get<CollectionVolumeService>(CollectionVolumeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
