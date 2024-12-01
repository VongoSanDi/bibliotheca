import { Injectable } from '@nestjs/common';
import { CreateBoxSetDto } from './dto/create-box-set.dto';
import { UpdateBoxSetDto } from './dto/update-box-set.dto';

@Injectable()
export class BoxSetService {
  create(createBoxSetDto: CreateBoxSetDto) {
    return 'This action adds a new boxSet';
  }

  findAll() {
    return `This action returns all boxSet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} boxSet`;
  }

  update(id: number, updateBoxSetDto: UpdateBoxSetDto) {
    return `This action updates a #${id} boxSet`;
  }

  remove(id: number) {
    return `This action removes a #${id} boxSet`;
  }
}
