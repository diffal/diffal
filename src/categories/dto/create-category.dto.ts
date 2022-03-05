import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;
  @IsNumber()
  number_of_count: number;
  @IsString({ each: true })
  categories: string[];
}
