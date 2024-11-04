import { PartialType } from '@nestjs/mapped-types';
import { CreateBoxSetDto } from './create-box-set.dto';

export class UpdateBoxSetDto extends PartialType(CreateBoxSetDto) {}
