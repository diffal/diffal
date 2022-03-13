import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './entities/post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);
    return await this.postRepository.save(post);
  }

  async findAll(_pagination?: PaginationDto) {
    const result = await this.postRepository.find();
    return result;
  }

  async findOne(id: string) {
    const result = await this.postRepository.findOne(id);
    return result;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.preload({ id, ...updatePostDto });
    return await this.postRepository.save(post);
  }

  async remove(id: string) {
    const post = await this.postRepository.findOne(id);
    return await this.postRepository.remove(post);
  }
}
