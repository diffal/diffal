import { Injectable, Logger } from '@nestjs/common';
import { CreateCrawlDto } from './dto/create-crawl.dto';
import { UpdateCrawlDto } from './dto/update-crawl.dto';
import { Cron } from '@nestjs/schedule';
import got from 'got';

@Injectable()
export class CrawlService {
  private readonly logger = new Logger(CrawlService.name);

  @Cron('*/10 * * * * *')
  async handleCron() {
    // var response2 = await got(`https://api.divar.ir/v8/web-search/mashhad/auto`);
    const categorylist = [
      'انتخاب دسته بندی',
      'buy-old-house',
      'buy-villa',
      'buy-apartment',
      'buy-residential',
      'auto',
      'classic-car',
      'rental-car',
      'heavy-car',
      'electronic-devices',
      'home-kitchen',
      'services',
      'personal-goods',
      'entertainment',
      'social-services',
      'tools-materials-equipment',
      'jobs',
    ];
    const category = categorylist[1];
    const response2 = await got(
      `https://api.divar.ir/v8/web-search/mashhad/${category}`,
    );

    const json = JSON.parse(response2.body);
    const carlist: { tokenid: string; title: string; descript: string }[] = [];
    json.widget_list.forEach(
      (item: {
        data: { token: string; title: string; description: string };
      }) => {
        const carobject = {
          tokenid: item.data.token,
          title: item.data.title,
          descript: item.data.description,
        };

        carlist.push(carobject);
      },
    );
    // for (let i = 0; i < 10; i++) {
    //   this.logger.debug(carlist[i].title, carlist[i].price, carlist[i].kilometer);

    // }
    console.log('Count Advertice :', carlist.length);
    console.log(carlist);
  }

  create(createCrawlDto: CreateCrawlDto) {
    return 'This action adds a new crawl';
  }

  findAll() {
    return `This action returns all crawl`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crawl`;
  }

  update(id: number, updateCrawlDto: UpdateCrawlDto) {
    return `This action updates a #${id} crawl`;
  }

  remove(id: number) {
    return `This action removes a #${id} crawl`;
  }
}
