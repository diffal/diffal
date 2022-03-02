import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestBedModule } from '../test-bed/test-bed.module';
import { PostRepository } from './entities/Post.repository';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let postRepository: PostRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TestBedModule.forRoot(),
        TypeOrmModule.forFeature([PostRepository]),
      ],

      providers: [PostService],
    }).compile();

    service = module.get<PostService>(PostService);

    postRepository = module.get<PostRepository>(PostRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return all posts', async () => {
    const posts = postRepository.create([
      {
        title: 'new post 1',
        description: '1st posts description',
      },

      {
        title: 'new post 2',
        description: '2nd posts description',
      },
      {
        title: 'new post 3',
        description: '3rd posts description',
      },
    ]);
    await postRepository.save(posts);

    const retrivedPosts = await service.findAll();
    expect(retrivedPosts).toEqual(posts);
  });
});
