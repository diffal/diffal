import { Test, TestingModule } from '@nestjs/testing';
import { async } from 'rxjs';
import { PostEntity } from './entities/post.entity';
import { PostRepository } from './entities/Post.repository';
import { PostService } from './post.service';


jest.mock('./entities/Post.repository')
describe('PostService', () => {
  let service: PostService;
  let postRepository: PostRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],

      providers: [PostService, PostRepository],
    }).compile();

    service = module.get<PostService>(PostService);

    postRepository = module.get<PostRepository>(PostRepository);
  });
  beforeEach(() => { jest.restoreAllMocks(); });



  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be defined', () => {
    expect(postRepository).toBeDefined();
  })
  it('should return all posts', async () => {

    let posts: PostEntity =
    {
      title: 'new post 1',
      id: 1,
      description: '1st posts description',

    }

    const findSpy = jest.spyOn(postRepository, 'find').mockResolvedValue([posts])

    const retrivedPosts = await service.findAll();

    expect(retrivedPosts).toEqual([posts]);

  });
});
