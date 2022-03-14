import { Module } from '@nestjs/common';
import { Management1Service } from './management1.service';
import { Management1Controller } from './management1.controller';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PostModule],
  controllers: [Management1Controller],
  providers: [Management1Service],
})
export class Management1Module { }
