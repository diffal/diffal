import { Module } from '@nestjs/common';
import { Management6Service } from './management6.service';
import { Management6Controller } from './management6.controller';

@Module({
  controllers: [Management6Controller],
  providers: [Management6Service],
})
export class Management6Module {}
