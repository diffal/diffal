import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestBedModule } from 'src/test-bed/test-bed.module';
import { CategoriesService } from './categories.service';
import { CategoryRepository } from './entities/category.Repository';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let categoryRepository: CategoryRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService],
      imports: [
        TestBedModule.forRoot(),
        TypeOrmModule.forFeature([CategoryRepository]),
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    categoryRepository = module.get<CategoryRepository>(CategoryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be find all categories ', async () => {
    const categories = categoryRepository.create({
      name:"cat1",
      childrens:[{
        name:'new1',
      }],
      parent:{}
    });

    await categoryRepository.save(categories);

    const retrievedCategories = await service.findAll();
    expect(retrievedCategories).toEqual(categories);
  });
});
