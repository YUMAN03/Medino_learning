import { IsString, IsInt, MinLength, IsEmail } from 'class-validator';

export class AuthSignupDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
