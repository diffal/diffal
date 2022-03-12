import { Module } from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { PostService } from '../post/post.service';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [PostModule],
  providers: [CrawlService],
})
export class CrawlModule {}
