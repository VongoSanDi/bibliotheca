import { PartialType } from '@nestjs/mapped-types';
import { CreateSerieTitleTranslationDto } from './create-serie-title-translation.dto';

export class UpdateSerieTitleTranslationDto extends PartialType(CreateSerieTitleTranslationDto) {}
