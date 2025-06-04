import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './dto/dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private nextId=1;

  create(dto: CreateTaskDto): Task {
    const newtask: Task={
        id:this.nextId++,
        ...dto

    }
    this.tasks.push(newtask);
    return newtask;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find(u => u.id === id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  update(id: number, dto: UpdateTaskDto): Task {
    const task= this.findOne(id);
    Object.assign(task, dto);
    return task;
  }

  remove(id: number): { message: string } {
    const index = this.tasks.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    this.tasks.splice(index, 1);
    return { message: 'Task removed' };
  }
}
