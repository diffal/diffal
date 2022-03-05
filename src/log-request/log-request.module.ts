import { Module } from '@nestjs/common';
import { LogRequestService } from './log-request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogRequestRepository } from './entities/log-request.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LogRequestRepository])],
  providers: [LogRequestService],
  exports: [LogRequestService],
})
export class LogRequestModule { }
