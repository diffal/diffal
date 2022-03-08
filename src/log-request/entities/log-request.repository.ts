import { EntityRepository, Repository } from 'typeorm';
import { LogRequestEntity } from './log-request.entity';

@EntityRepository(LogRequestEntity)
export class LogRequestRepository extends Repository<LogRequestEntity> {}
