import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from './post.entity';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  static save(_posts: void) {
    throw new Error('Method not implemented.');
  }
  static create(_arg0: { id: string; title: string; description: string }[]) {
    throw new Error('Method not implemented.');
  }
  async createPost(createPostDto: CreatePostDto) {
    const post = this.create({
      ...createPostDto,
    });
    return this.save(post);
  }
}
