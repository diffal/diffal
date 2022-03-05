import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity('category')
@Tree('nested-set')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @TreeChildren()
  childrens: CategoryEntity[];
  @TreeParent()
  parent: CategoryEntity;
}
