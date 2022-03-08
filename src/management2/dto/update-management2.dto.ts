import { PartialType } from '@nestjs/mapped-types';
import { CreateManagement2Dto } from './create-management2.dto';

export class UpdateManagement2Dto extends PartialType(CreateManagement2Dto) {}
