import { Module } from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { CrawlController } from './crawl.controller';

@Module({
  controllers: [CrawlController],
  providers: [CrawlService],
})
export class CrawlModule {}
