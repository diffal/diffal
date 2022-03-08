import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestBedModule } from '../test-bed/test-bed.module';
import { LogRequestRepository } from './entities/log-request.repository';
import { LogRequestService } from './log-request.service';

describe('LogRequestService', () => {
  let service: LogRequestService;
  let logRequestRepository: LogRequestRepository;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TestBedModule.forRoot(),
        TypeOrmModule.forFeature([LogRequestRepository]),
      ],
      providers: [LogRequestService],
    }).compile();

    service = module.get<LogRequestService>(LogRequestService);
    logRequestRepository =
      module.get<LogRequestRepository>(LogRequestRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert this log ', async () => {
    await service.insertLog('GET', '/home');
    const finderr = await logRequestRepository.findOne({
      where: {
        url: '/home',
      },
    });
    expect(finderr).toBeDefined();
  });
});
