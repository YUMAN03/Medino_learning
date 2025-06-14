// create-comment.dto.ts
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;

  @IsInt()
  taskId: number;
}

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  content?: string;
}