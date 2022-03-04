import { Module } from '@nestjs/common';
import { LogRequestService } from './log-request.service';
import { LogRequestController } from './log-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogRequestRepository } from './entities/log-request.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LogRequestRepository])],
  controllers: [LogRequestController],
  providers: [LogRequestService],
  exports: [LogRequestService],
})
export class LogRequestModule {}
