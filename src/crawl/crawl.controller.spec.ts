import { Test, TestingModule } from '@nestjs/testing';
import { CrawlController } from './crawl.controller';
import { CrawlService } from './crawl.service';

describe('CrawlController', () => {
  let controller: CrawlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrawlController],
      providers: [CrawlService],
    }).compile();

    controller = module.get<CrawlController>(CrawlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
