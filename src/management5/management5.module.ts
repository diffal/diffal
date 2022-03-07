import { Module } from '@nestjs/common';
import { Management5Service } from './management5.service';
import { Management5Controller } from './management5.controller';

@Module({
  controllers: [Management5Controller],
  providers: [Management5Service],
})
export class Management5Module {}
