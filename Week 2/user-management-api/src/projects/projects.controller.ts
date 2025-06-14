import { Controller, Post, Get, Param, Patch, Delete, Body, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() dto: CreateProjectDto, @Req() req: Request) {
    return this.projectsService.create(dto, (req.user as any)['userId']);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.projectsService.findAll((req.user as any)['userId']);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return this.projectsService.findOne(id, (req.user as any)['userId']);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProjectDto, @Req() req: Request) {
    return this.projectsService.update(id, dto, (req.user as any)['userId']);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return this.projectsService.remove(id, (req.user as any)['userId']);
  }
}
