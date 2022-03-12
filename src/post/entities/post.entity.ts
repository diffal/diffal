import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('post')
export class PostEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;
}
