import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UserCollectionResponseDto } from './dto/retrieve-collection.dto';
import { PageOptionsDto } from 'src/common/dto/PageOptionsDto';
import { PaginatedResponse } from 'src/common/types/response';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) { }

  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionService.create(createCollectionDto);
  }

  @Get()
  async findAll() {
    return await this.collectionService.findAll();
  }

  @Get('user/:id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Retrieve an user collection' })
  @ApiParam({ name: 'id', required: true, type: Number })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PaginatedResponse<UserCollectionResponseDto>> {
    const dto = {
      user_id: id,
    };
    const { data, itemCount } = await this.collectionService.findOne(
      dto,
      pageOptionsDto,
    );
    return {
      data,
      itemCount,
      pageOptionsDto,
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    return this.collectionService.update(+id, updateCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionService.remove(+id);
  }
}
