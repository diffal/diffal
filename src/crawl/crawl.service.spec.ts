import { Test, TestingModule } from '@nestjs/testing';
import { CrawlService } from './crawl.service';

describe('CrawlService', () => {
  let service: CrawlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrawlService],
    }).compile();

    service = module.get<CrawlService>(CrawlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
