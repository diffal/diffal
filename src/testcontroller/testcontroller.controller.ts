import { Controller, Get, Post } from '@nestjs/common';

@Controller('test')
export class TestcontrollerController {
  @Get()
  gHello(): string {
    return 'hi';
  }
}
