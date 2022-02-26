import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionLogRepository } from './entities/exception-log.repository';
import { ExceptionLogService } from './exception-log/exception-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExceptionLogRepository])],
  providers: [ExceptionLogService],
  exports: [ExceptionLogService],
})
export class LoggerModule { }
