import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { PostRepository } from './entities/post.repository';
import { PostService } from './post.service';

jest.mock('./entities/post.repository');
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
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be defined', () => {
    expect(postRepository).toBeDefined();
  });
  it('should return all posts', async () => {
    const posts: PostEntity = {
      title: 'new post 1',
      id: '1',
      description: '1st posts description',
    };

    const findSpy = jest
      .spyOn(postRepository, 'find')
      .mockResolvedValue([posts]);

    const retrivedPosts = await service.findAll();

    expect(findSpy).toBeCalled;
    expect(retrivedPosts).toEqual([posts]);
  });
});

jest.mock('./entities/post.repository');
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
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should return one post', async () => {
    const posts: PostEntity = {
      title: 'new post 1',
      id: '1',
      description: '1st posts description',
    };

    const find1Spy = jest
      .spyOn(postRepository, 'findOne')
      .mockResolvedValue(posts);

    const result = await service.findOne('1');

    expect(find1Spy).toBeCalled;
    expect(result).toEqual(posts);
  });
});

jest.mock('./entities/post.repository');
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
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should return all searched posts', async () => {
    const posts: PostEntity[] = [
      {
        title: 'new post 1',
        id: '1',
        description: '1st posts description',
      },
      {
        title: 'des post 2',
        id: '1',
        description: 'rgeidsghbnurfhnjge',
      },
      {
        title: 'new post 3',
        id: '1',
        description: 'deseeeeeeeeeeee',
      },
    ];
    const searchSpy = jest
      .spyOn(postRepository, 'find')
      .mockResolvedValue(posts);

    const result = await service.search('des');
    const testans = [];
    posts.forEach((item) => {
      if (
        item.title.indexOf('des') != -1 ||
        item.description.indexOf('des') != -1
      ) {
        testans.push(1);
      }
    });

    expect(searchSpy).toBeCalled;
    expect(result).toEqual(posts);
    expect(testans).toEqual([1, 1, 1]);
  });
});

jest.mock('./entities/post.repository');
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
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should update one post', async () => {
    // Arrange
    const postId = '1';
    const postDto: UpdatePostDto = {
      title: 'new title',
    };
    const expectedPost = {
      title: postDto.title,
      id: postId,
      description: '',
    };

    const updateSpy = jest
      .spyOn(postRepository, 'preload')
      .mockResolvedValue(expectedPost);
    const saveSpy = jest
      .spyOn(postRepository, 'save')
      .mockResolvedValue(expectedPost);

    const result = await service.update(postId, postDto);

    expect(updateSpy).toBeCalled;
    expect(result).toEqual(expectedPost);
    expect(saveSpy).toBeCalledWith(expectedPost);
  });
});

jest.mock('./entities/post.repository');
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
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should remove one post', async () => {
    const posts: PostEntity = {
      title: 'new post 1',
      id: '1',
      description: '1st posts description',
    };

    const find1Spy = jest
      .spyOn(postRepository, 'findOne')
      .mockResolvedValue(posts);

    const result = await service.findOne('1');

    const removeSpy = jest
      .spyOn(postRepository, 'remove')
      .mockResolvedValue(result);

    expect(find1Spy).toBeCalled;
    expect(removeSpy).toBeCalled;
    expect(result).toBeNull;
  });
});
