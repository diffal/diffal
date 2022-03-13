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
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationDto } from './dto/pagination.dto';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get('/paginate')
  findAllPaginated(@Query() query: PaginationDto) {
    return this.postService.findAll(query);
  }

  @Get('/:id')
  async findOne(@Param('id') id) {
    return this.postService.findOne(id);
  }

  @Post()
  async insert(@Body() body: CreatePostDto) {
    return await this.postService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdatePostDto) {
    return await this.postService.update(id, body);
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
