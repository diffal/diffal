import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('logRequest')
export class LogRequestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  method: string;

  @Column()
  url: string;

  @Column()
  requestDate: Date;
}
