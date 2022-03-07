import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './entities/Post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create({
      ...createPostDto,
    });
    return this.postRepository.save(post);
  }

  async findAll(pagination?: PaginationDto) {
    const result = await this.postRepository.find();
    return result;
  }

  async findOne(id: number) {
    const result = await this.postRepository.findOne(id);
    if (!result) {
      throw new NotFoundException();
    } else {
      return result;
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.preload({ id, ...updatePostDto });

    return this.postRepository.save(post);
  }

  async remove(id: number) {
    const post = await this.postRepository.findOne(id);
    return this.postRepository.remove(post);
  }
}
