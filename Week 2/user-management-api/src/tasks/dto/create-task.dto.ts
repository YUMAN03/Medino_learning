import { IsEnum, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum Status {
  Pending = 'pending',
  In_progress = 'in_progress',
  Done = 'done',
}

export class CreateTaskDto {  
  @IsString()
  title: string;
  @IsString()
  description: string;
  @ApiProperty({enum: Status})
  @IsEnum(Status)
  status: Status;
}
