import { PartialType } from '@nestjs/mapped-types';
import { CreateBookTitleTranslationDto } from './create-book-title-translation.dto';

export class UpdateBookTitleTranslationDto extends PartialType(CreateBookTitleTranslationDto) {}
