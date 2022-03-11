import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import got from 'got';
import { PostService } from '../post/post.service';

@Injectable()
export class CrawlService {
  constructor(private readonly postService: PostService) {}

  @Cron('*/10 * * * * *')
  async handleCron() {
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
    const response = await got(
      `https://api.divar.ir/v8/web-search/mashhad/${category}`,
    );

    const json = JSON.parse(response.body);
    const Adverlist: { title: string; descript: string }[] = [];
    json.widget_list.forEach(
      (item: {
        data: { token: string; title: string; description: string };
      }) => {
        const tokenid = item.data.token;
        const Adverobject = {
          title: item.data.title,
          descript: item.data.description,
        };
        this.postService.update(tokenid, Adverobject);
        Adverlist.push(Adverobject);
      },
    );
    console.log('Count Advertice :', Adverlist.length);
    console.log(Adverlist);
  }
}
