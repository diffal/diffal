import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
