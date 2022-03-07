import { PartialType } from '@nestjs/mapped-types';
import { CreateManagement3Dto } from './create-management3.dto';

export class UpdateManagement3Dto extends PartialType(CreateManagement3Dto) {}
