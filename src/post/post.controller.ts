import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  Res,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Response } from 'express';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationDto } from './dto/pagination.dto';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(@Res() res?: Response) {
    const result = await this.postService.findAll();
    const post = res.render('archive-post', {
      posts: result,
      title: 'آگهی ها-سایت دیفال',
    });
    return { result, post };
  }

  @Get('/paginate')
  findAllPaginated(@Query() query: PaginationDto) {
    return this.postService.findAll(query);
  }

  @Get('/:id')
  async findOne(@Param('id') id) {
    return this.postService.findOne(id);
  }

  @Get('/search/q?')
  async search(@Query('text') text: string, @Res() res?: Response) {
    const result = await this.postService.search(text);
    const search = res.render('search', {
      posts: result,
      title: ` نتایج جستجو برای '${text}'`,
    });
    return { result, search };
  }

  @Post('/')
  insert(@Body() body: CreatePostDto) {
    return this.postService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdatePostDto) {
    return this.postService.update(id, body);
  }

  @Patch(':id')
  patch(@Param('id') id, @Body() body: UpdatePostDto) {
    console.log(body instanceof UpdatePostDto);
    return this.postService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.postService.remove(id);
  }
}
