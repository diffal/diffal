import { Module } from '@nestjs/common';
import { Management3Service } from './management3.service';
import { Management3Controller } from './management3.controller';

@Module({
  controllers: [Management3Controller],
  providers: [Management3Service],
})
export class Management3Module {}
