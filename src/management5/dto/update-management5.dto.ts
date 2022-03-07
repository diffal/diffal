import { PartialType } from '@nestjs/mapped-types';
import { CreateManagement5Dto } from './create-management5.dto';

export class UpdateManagement5Dto extends PartialType(CreateManagement5Dto) {}
