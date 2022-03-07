import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChildEntity, Repository, TreeChildren } from 'typeorm';
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

  async remove(id: string) {
    const delete_category = await this.categoryRepository.findOne(id);
    if (!id) {
      throw new NotFoundException('not found category');
    }
    return this.categoryRepository.remove(delete_category);
  }
  
    async remove_child(id: string, id_child: CategoryEntity) {
      const findParent = await this.categoryRepository.findOne(id);
      const findChild = await this.categoryRepository.findOne({
       where:{
         id:id_child.childrens
       } 
      })
  
      if (findChild != undefined || findParent == findChild) {
        this.categoryRepository.remove(findParent)
        return this.categoryRepository.remove(findChild)
      }
    }
    

  //Net solution*
  /*
  async delete_child(id: string) {

    const ParentTree = await this.categoryRepository.getTreeRepository(CategoryEntity);
    const nodeToBeDeleted = await this.categoryRepository.getTreeRepository(CategoryEntity).findOne(id);
    await this.categoryRepository.query("SET foreign_key_checks = 0;");
    const res = await ParentTree.remove(await ParentTree.findDescendants(nodeToBeDeleted));
    await this.categoryRepository.query("SET foreign_key_checks = 1;");
    return {
      result: res.length > 0 ? 'Deleted successfully' : 'Already deleted'
    }
  }
  */
}
