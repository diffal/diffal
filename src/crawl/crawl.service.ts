import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import got from 'got';
import { PostService } from '../post/post.service';

@Injectable()
export class CrawlService {
  constructor(private readonly postService: PostService) { }

  @Cron('60 * * * * *')
  async handleCron() {
    const response = await got(`https://api.divar.ir/v8/web-search/mashhad`);

    const json = JSON.parse(response.body);
    const Adverlist: { id: string; title: string; description: string; image: string }[] = [];
    json.web_widgets.post_list.forEach(
      async (item: {
        data: { token: string; title: string; description: string; image: string };
      }) => {
        const Adverobject = {
          id: item.data.token,
          title: item.data.title,
          description: item.data.description,
          image: item.data.image
        };

        Adverlist.push(Adverobject);
      },
    );
    for (let i = 0; i < Adverlist.length; i++) {
      await this.postService.create(Adverlist[i]);
    }
  }
}
