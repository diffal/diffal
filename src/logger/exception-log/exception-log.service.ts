import { Injectable } from '@nestjs/common';
import { ExceptionLogRepository } from '../entities/exception-log.repository';

@Injectable()
export class ExceptionLogService {
  constructor(
    private readonly exceptionLogRepository: ExceptionLogRepository,
  ) {}

  insertLog(statusCode: number, message: string) {
    const log = this.exceptionLogRepository.create({
      error: message,
      statusCode,
      createdAt: new Date(),
    });

    return this.exceptionLogRepository.save(log);
  }
}
