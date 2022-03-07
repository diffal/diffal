import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestBedModule } from '../test-bed/test-bed.module';
import { ExceptionLogRepository } from './entities/exception-log.repository';

import { ExceptionLogService } from './exception-log.service';

describe('EceptionLogService', () => {
  let service: ExceptionLogService;
  let exceptionLogRepository: ExceptionLogRepository;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TestBedModule.forRoot(),
        TypeOrmModule.forFeature([ExceptionLogRepository]),
      ],
      providers: [ExceptionLogService],
    }).compile();

    service = module.get<ExceptionLogService>(ExceptionLogService);
    exceptionLogRepository = module.get<ExceptionLogRepository>(
      ExceptionLogRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert this log ', async () => {
    await service.insertLog(404, 'test error');
    const finderr = await exceptionLogRepository.findOne({
      where: {
        error: 'test error',
      },
    });
    expect(finderr).toBeDefined();
  });
});
