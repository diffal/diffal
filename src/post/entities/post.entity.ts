import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column({ type: 'nvarchar', length: '4000' })
  description: string;
}
