import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CollectionVolumeService } from './collection-volume.service';
import { CreateCollectionVolumeDto } from './dto/create-collection-volume.dto';
import { UpdateCollectionVolumeDto } from './dto/update-collection-volume.dto';

@Controller('collection-volume')
export class CollectionVolumeController {
  constructor(private readonly collectionVolumeService: CollectionVolumeService) {}

  @Post()
  create(@Body() createCollectionVolumeDto: CreateCollectionVolumeDto) {
    return this.collectionVolumeService.create(createCollectionVolumeDto);
  }

  @Get()
  findAll() {
    return this.collectionVolumeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionVolumeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectionVolumeDto: UpdateCollectionVolumeDto) {
    return this.collectionVolumeService.update(+id, updateCollectionVolumeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionVolumeService.remove(+id);
  }
}
