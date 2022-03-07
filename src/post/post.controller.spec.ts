import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';
import { PostEntity } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

class fakePostService {
  findAll(): any {}
}

describe('PostController', () => {
  let controller: PostController;
  let service: fakePostService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService],
    })
      .overrideProvider(PostService)
      .useClass(fakePostService)
      .compile();

    controller = module.get<PostController>(PostController);
    service = module.get<fakePostService>(PostService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return all posts', async () => {
    //Arrange
    const posts = [];

    const findAllPosts = jest
      .spyOn(service, 'findAll')
      .mockResolvedValue(posts);
    //Act
    const expectedValue = await controller.findAll();
    //Assert
    expect(service.findAll).toBeCalled();
    expect(expectedValue).toEqual(posts);

    findAllPosts.mockReset();
  });
});
