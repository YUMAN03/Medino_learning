import { Controller, Post, Patch, Delete, Param, Body, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Req() req: Request, @Body() dto: CreateCommentDto) {
    return this.commentsService.create(dto, (req.user as any)['userId']);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCommentDto, @Req() req: Request) {
    return this.commentsService.update(id, dto, (req.user as any)['userId']);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    console.log((req.user as any)['userId']);
    return this.commentsService.remove(id, (req.user as any)['userId']);
  }
}
