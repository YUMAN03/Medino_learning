import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get(':id/tasks')
  getUserTasks(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserTasks(id);
  }

  @Get(':id/projects')
  getUserProjects(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserProjects(id);
  }

  @Get(':id/comments')
  getUserComments(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserComments(id);
  }
}
