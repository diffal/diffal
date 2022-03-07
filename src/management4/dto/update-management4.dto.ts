import { PartialType } from '@nestjs/mapped-types';
import { CreateManagement4Dto } from './create-management4.dto';

export class UpdateManagement4Dto extends PartialType(CreateManagement4Dto) {}
