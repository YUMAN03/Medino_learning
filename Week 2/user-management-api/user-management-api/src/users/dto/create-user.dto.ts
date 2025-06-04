// create-user.dto.ts
import { IsString, IsInt, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  age: number;
}