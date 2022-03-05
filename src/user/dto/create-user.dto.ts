import { IsNumber, IsString } from 'class-validator';
import { isNumber } from 'util';
export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    username: string;

    @IsNumber()
    password: number;
}
