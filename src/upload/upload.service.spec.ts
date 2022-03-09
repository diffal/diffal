import { Test, TestingModule } from '@nestjs/testing';
import { TestBedModule } from 'src/test-bed/test-bed.module';
import { UploadService } from './upload.service';

describe('uploadService', () => {
  let service: UploadService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestBedModule.forRoot()],
      providers: [UploadService],
    }).compile();

    service = module.get<UploadService>(UploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
