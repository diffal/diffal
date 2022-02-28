import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Res } from '@nestjs/common';
import { Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  Root(@Res() res: Response) {

    return res.render('index', {
      title: 'دیفال',
    }
    )
  }

  getHello(): string {
    return this.appService.getHello();
  }
}
