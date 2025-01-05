import { Module } from '@nestjs/common';
import { SerieService } from './serie.service';
import { SerieController } from './serie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Serie } from './entities/serie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Serie])],
  controllers: [SerieController],
  providers: [SerieService],
})
export class SerieModule { }
