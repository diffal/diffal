import { Module } from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { PostService } from '../post/post.service';

@Module({
  imports: [PostService],
  providers: [CrawlService],
})
export class CrawlModule {}
