import { PartialType } from '@nestjs/mapped-types';
import { CreateBoxSetBookDto } from './create-box-set-book.dto';

export class UpdateBoxSetBookDto extends PartialType(CreateBoxSetBookDto) {}
