import { Injectable } from '@nestjs/common';
import { CreateLogRequestDto } from './dto/create-log-request.dto';
import { UpdateLogRequestDto } from './dto/update-log-request.dto';
import { LogRequestRepository } from './entities/log-request.repository';

@Injectable()
export class LogRequestService {
  constructor(private readonly logRequestRepository: LogRequestRepository) {}

  insertLog(method: string, url: string) {
    const log = this.logRequestRepository.create({
      method,
      url,
      requestDate: new Date(),
    });

    return this.logRequestRepository.save(log);
  }
}
