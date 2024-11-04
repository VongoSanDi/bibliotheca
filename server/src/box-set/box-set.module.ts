import { Module } from '@nestjs/common';
import { BoxSetService } from './box-set.service';
import { BoxSetController } from './box-set.controller';

@Module({
  controllers: [BoxSetController],
  providers: [BoxSetService],
})
export class BoxSetModule {}
