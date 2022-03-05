import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PaginatedDto } from './dto/pageinated_category';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  async preload_categories(item: string) {
    const category = await this.categoryRepository.findOne({
      where: {
        name: item,
      },
    });
    if (category) {
      return category;
    } else {
      return this.categoryRepository.create({ name: item });
    }
  }
  async create(createCategoryDto: CreateCategoryDto) {
    const categories = await Promise.all(
      createCategoryDto.categories.map((item) => {
        return this.preload_categories(item);
      }),
    );
    const category = this.categoryRepository.create({
      ...createCategoryDto,
      childrens: categories,
    });
    return this.categoryRepository.save(category);
  }

  findAll(pageinated?: PaginatedDto) {
    return this.categoryRepository.find({
      relations: ['childrens'],
      skip: pageinated.page * pageinated.page_count,
      take: pageinated.page_count,
    });
  }

  findOne(id: number) {
    return this.categoryRepository.findOne(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categories = await Promise.all(
      updateCategoryDto.categories.map((_item) => {
        return this.preload_categories(_item);
      }),
    );
  }

  async remove(id: number) {
    const delete_category = await this.findOne(id);
    if (id != undefined) {
      this.categoryRepository.remove(delete_category);
    } else {
      console.log('ID not found');
      return HttpStatus.NOT_FOUND;
    }
    return delete_category;
  }
}
