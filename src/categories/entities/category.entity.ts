import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity('category')
@Tree('closure-table')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @TreeChildren({ cascade: true })
  childrens: CategoryEntity[];
  @TreeParent()
  parent: CategoryEntity;
}
