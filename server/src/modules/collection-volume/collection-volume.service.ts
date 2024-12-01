import { Injectable } from '@nestjs/common';
import { CreateCollectionVolumeDto } from './dto/create-collection-volume.dto';
import { UpdateCollectionVolumeDto } from './dto/update-collection-volume.dto';

@Injectable()
export class CollectionVolumeService {
  create(createCollectionVolumeDto: CreateCollectionVolumeDto) {
    return 'This action adds a new collectionVolume';
  }

  findAll() {
    return `This action returns all collectionVolume`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collectionVolume`;
  }

  update(id: number, updateCollectionVolumeDto: UpdateCollectionVolumeDto) {
    return `This action updates a #${id} collectionVolume`;
  }

  remove(id: number) {
    return `This action removes a #${id} collectionVolume`;
  }
}
