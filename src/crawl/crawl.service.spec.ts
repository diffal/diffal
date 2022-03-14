import { Test, TestingModule } from '@nestjs/testing';
import { TestBedModule } from '../test-bed/test-bed.module';
import { PostModule } from '../post/post.module'
import { PostService } from '../post/post.service';
import { CrawlService } from './crawl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../post/entities/post.entity';

jest.mock('../post/post.service')

describe('EceptionLogService', () => {
  let service: CrawlService;
  let postService: PostService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PostModule,
        TestBedModule.forRoot(),
      ],
      providers: [CrawlService],
    }).compile();

    service = module.get<CrawlService>(CrawlService);
    postService = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be call handleCron ', async () => {
    // Arrange
    const advertic = { id: '12wkdn', title: 'test', description: 'description test' };
    const createSpy = jest.spyOn(postService, 'create').mockResolvedValue(advertic);
    const handleCronSpy = jest.spyOn(service, 'handleCron');

    // Act
    const expectedValue = await service.handleCron();

    // Assert
    expect(handleCronSpy).toBeCalled();
    expect(createSpy).toBeCalled();

    createSpy.mockReset();
  });

});
