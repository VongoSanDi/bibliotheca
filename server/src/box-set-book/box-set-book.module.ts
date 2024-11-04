import { Module } from '@nestjs/common';
import { BoxSetBookService } from './box-set-book.service';
import { BoxSetBookController } from './box-set-book.controller';

@Module({
  controllers: [BoxSetBookController],
  providers: [BoxSetBookService],
})
export class BoxSetBookModule {}
