import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PaginatedDto {
  @Type(() => Number)
  @IsOptional()
  page: number;
  @Type(() => Number)
  @IsOptional()
  page_count: number;
}
