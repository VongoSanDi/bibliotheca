import { Module } from '@nestjs/common';
import { CollectionVolumeService } from './collection-volume.service';
import { CollectionVolumeController } from './collection-volume.controller';

@Module({
  controllers: [CollectionVolumeController],
  providers: [CollectionVolumeService],
})
export class CollectionVolumeModule {}
