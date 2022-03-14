import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PaginatedDto {
  @Type(() => Number)
  @IsOptional()
  @ApiProperty()
  page: number;

  @Type(() => Number)
  @IsOptional()
  @ApiProperty()
  page_count: number;
}
