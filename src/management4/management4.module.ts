import { Module } from '@nestjs/common';
import { Management4Service } from './management4.service';
import { Management4Controller } from './management4.controller';

@Module({
  controllers: [Management4Controller],
  providers: [Management4Service],
})
export class Management4Module {}
