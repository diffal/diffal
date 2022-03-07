import { Module } from '@nestjs/common';
import { Management2Service } from './management2.service';
import { Management2Controller } from './management2.controller';

@Module({
  controllers: [Management2Controller],
  providers: [Management2Service],
})
export class Management2Module {}
