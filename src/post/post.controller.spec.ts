import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

jest.mock('./post.service');
describe('PostController', () => {
  let controller: PostController;
  let service: PostService;
  const post: PostEntity = {
    description: 'description',
    id: '2',
    title: 'title',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService],
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('postController', () => {
    describe('definition', () => {
      it('should be defined', () => {
        expect(service).toBeDefined();
      });
    });

    describe('findOne', () => {
      it('should find one post', async () => {
        const findOneSpy = jest
          .spyOn(service, 'findOne')
          .mockResolvedValue(post);
        const result = await controller.findOne('2');
        expect(findOneSpy).toBeCalled;
        expect(result).toEqual(post);
      });
    });

    describe('findAll', () => {
      it('postService findall called and return posts', async () => {
        const findAllspy = jest
          .spyOn(service, 'findAll')
          .mockResolvedValue([post]);
        const result = await controller.findAll();
        expect(findAllspy).toBeCalled();
        expect(result).toEqual([post]);
      });
    });

    describe('search', () => {
      it('should return all searched posts', async () => {
        const searchspy = jest
          .spyOn(service, 'search')
          .mockResolvedValue([post]);
        const result = await controller.search('des');
        expect(searchspy).toBeCalled();
        expect(result).toEqual([post]);
      });
    });

    describe('update', () => {
      const postStub: UpdatePostDto = {
        description: 'new discription',
      };
      it('should update a post', async () => {
        const updatedPost = post;
        updatedPost.description = postStub.description;
        const updatespy = jest
          .spyOn(service, 'update')
          .mockResolvedValue(updatedPost);
        const result = await controller.update('2', postStub);

        expect(updatespy).toBeCalledWith('2', postStub);
        expect(result).toEqual(updatedPost);
      });
    });

    describe('delete', () => {
      it('should delete post', async () => {
        const deletSpy = jest.spyOn(service, 'remove').mockResolvedValue(post);
        const result = await controller.delete('2');
        expect(deletSpy).toBeCalled;
        expect(result).toBeNull;
      });
    });
  });
});
