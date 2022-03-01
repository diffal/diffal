import { EntityRepository, Repository } from 'typeorm';
import { ExceptionLogEntity } from './exception-log.entity';

@EntityRepository(ExceptionLogEntity)
export class ExceptionLogRepository extends Repository<ExceptionLogEntity> {
}
