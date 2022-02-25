import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionLogEntity } from './entities/exception-log.entity';
import { ExceptionLogService } from './exception-log/exception-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExceptionLogEntity])],
  providers: [ExceptionLogService],
  exports: [ExceptionLogService],
})
export class LoggerModule {}
