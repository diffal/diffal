import { PartialType } from '@nestjs/mapped-types';
import { CreateManagement1Dto } from './create-management1.dto';

export class UpdateManagement1Dto extends PartialType(CreateManagement1Dto) {}
