import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exceptionLog')
export class ExceptionLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  statusCode: number;

  @Column()
  error: string;

  @Column()
  createdAt: Date;
}
