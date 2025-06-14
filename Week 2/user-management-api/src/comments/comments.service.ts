// comments.service.ts
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateCommentDto, userId: number) {
    return this.prisma.comment.create({ data: { ...dto, userId } });
  }

  async update(id: number, dto: UpdateCommentDto, userId: number) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.userId !== userId) throw new ForbiddenException('Not authorized to edit this comment');
    return this.prisma.comment.update({ where: { id }, data: dto });
  }

  async remove(id: number, userId: number) {
  const comment = await this.prisma.comment.findUnique({ where: { id } });
  if (!comment) throw new NotFoundException('Comment not found');
  console.log('Logged-in userId:', userId);
console.log('Comment owner userId:', comment.userId);
  if (comment.userId !== userId) throw new ForbiddenException('Not authorized to delete this comment');
  return this.prisma.comment.delete({ where: { id } });
}


  async findByTask(taskId: number) {
    return this.prisma.comment.findMany({ where: { taskId } });
  }
}