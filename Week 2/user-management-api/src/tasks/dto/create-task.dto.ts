import { IsString, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  status: string;

  @IsInt()
  projectId: number;
}
