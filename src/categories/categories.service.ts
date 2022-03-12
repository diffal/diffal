import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChildEntity, Repository, TreeChildren } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PaginatedDto } from './dto/pageinated_category';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CategoryRepository } from './entities/category.Repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
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
  findAllCategory() {
    return this.categoryRepository.find();
  }

  findAll(pageinated?: PaginatedDto) {
    return this.categoryRepository.find({
      relations: ['childrens'],
      skip: pageinated.page * pageinated.page_count,
      take: pageinated.page_count,
    });
  }

  findOne(id: string) {
    return this.categoryRepository.findOne(id);
  }

  async remove(id: string) {
    const delete_category = await this.categoryRepository.findOne(id);
    if (!id) {
      throw new NotFoundException('not found category');
    }
    return this.categoryRepository.remove(delete_category);
  }
  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const categories = await Promise.all(
      updateCategoryDto.categories.map((_item) => {
        return this.preload_categories(_item);
      }),
    );
    const student = this.categoryRepository.create({
      id: id,
      ...updateCategoryDto,
      childrens: categories,
    });
    if (!student) {
      throw new NotFoundException(`The student with ${id} not found`);
    }
    return this.categoryRepository.save(student);
  }
}
