import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCollection } from './entities/user-collection.view-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCollection])],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule { }
