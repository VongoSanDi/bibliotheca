import { RetrieveVolumeDto } from 'src/volume/dto/retrieve-volume.dto';

export class RetrieveCollectionDto {
  collection_id: number;
  user_id: number;
  name: string;
  volumes: RetrieveVolumeDto[];
}
