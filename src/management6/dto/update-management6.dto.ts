import { PartialType } from '@nestjs/mapped-types';
import { CreateManagement6Dto } from './create-management6.dto';

export class UpdateManagement6Dto extends PartialType(CreateManagement6Dto) {}
