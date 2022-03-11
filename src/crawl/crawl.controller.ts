import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { CreateCrawlDto } from './dto/create-crawl.dto';
import { UpdateCrawlDto } from './dto/update-crawl.dto';

@Controller('crawl')
export class CrawlController {
  constructor(private readonly crawlService: CrawlService) {}

  @Post()
  create(@Body() createCrawlDto: CreateCrawlDto) {
    return this.crawlService.create(createCrawlDto);
  }

  @Get()
  findAll() {
    return this.crawlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crawlService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrawlDto: UpdateCrawlDto) {
    return this.crawlService.update(+id, updateCrawlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crawlService.remove(+id);
  }
}
