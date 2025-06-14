import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany({
      select: { id: true, name: true, email: true },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findUserTasks(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { tasks: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user.tasks;
  }

  async findUserProjects(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { projects: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user.projects;
  }

  async findUserComments(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { comments: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user.comments;
  }
}
