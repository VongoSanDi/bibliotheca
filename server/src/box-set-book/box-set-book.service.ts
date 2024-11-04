import { Injectable } from '@nestjs/common';
import { CreateBoxSetBookDto } from './dto/create-box-set-book.dto';
import { UpdateBoxSetBookDto } from './dto/update-box-set-book.dto';

@Injectable()
export class BoxSetBookService {
  create(createBoxSetBookDto: CreateBoxSetBookDto) {
    return 'This action adds a new boxSetBook';
  }

  findAll() {
    return `This action returns all boxSetBook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} boxSetBook`;
  }

  update(id: number, updateBoxSetBookDto: UpdateBoxSetBookDto) {
    return `This action updates a #${id} boxSetBook`;
  }

  remove(id: number) {
    return `This action removes a #${id} boxSetBook`;
  }
}
