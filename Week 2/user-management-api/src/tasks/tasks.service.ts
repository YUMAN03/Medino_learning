import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto, userId: number) {
    console.log(userId);
    return await this.prisma.task.create({ data: { ...dto, userId } });
  }

  findAll(userId: number) {
    return this.prisma.task.findMany({ where: { userId } });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  update(id: number, dto: UpdateTaskDto) {
    return this.prisma.task.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.task.delete({ where: { id } });
  }

  getComments(taskId: number) {
    return this.prisma.comment.findMany({ where: { taskId } });
  }
}