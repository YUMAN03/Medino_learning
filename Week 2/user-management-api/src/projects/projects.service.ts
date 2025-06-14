import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateProjectDto, userId: number) {
    return this.prisma.project.create({ data: { ...dto, userId } });
  }

  findAll(userId: number) {
    return this.prisma.project.findMany({ where: { userId } });
  }

  async findOne(id: number, userId: number) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project || project.userId !== userId) throw new NotFoundException('Project not found');
    return project;
  }

  update(id: number, dto: UpdateProjectDto, userId: number) {
    return this.prisma.project.update({ where: { id, userId }, data: dto });
  }

  remove(id: number, userId: number) {
    return this.prisma.project.delete({ where: { id, userId } });
  }
}