import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectionVolumeDto } from './create-collection-volume.dto';

export class UpdateCollectionVolumeDto extends PartialType(CreateCollectionVolumeDto) {}
