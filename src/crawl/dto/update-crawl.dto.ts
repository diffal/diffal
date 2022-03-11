import { PartialType } from '@nestjs/swagger';
import { CreateCrawlDto } from './create-crawl.dto';

export class UpdateCrawlDto extends PartialType(CreateCrawlDto) {}
