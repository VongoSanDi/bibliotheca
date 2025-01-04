import { Module } from '@nestjs/common';
import { SerieTitleTranslationService } from './serie-title-translation.service';
import { SerieTitleTranslationController } from './serie-title-translation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SerieTitleTranslation } from './entities/serie-title-translation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SerieTitleTranslation])],
  controllers: [SerieTitleTranslationController],
  providers: [SerieTitleTranslationService],
})
export class SerieTitleTranslationModule { }
