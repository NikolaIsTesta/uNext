import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import TaskGuard from 'src/guards/task.guard';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard, TaskGuard)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  
  @UseGuards(JwtAuthenticationGuard)
  @Get('from-sub/:id')
  async subTasks(@Param('id') id: number) {
    return this.taskService.allSubTask(Number(id));
  }


  @UseGuards(JwtAuthenticationGuard)
  @Get('student-mark/:id')
  async studentMark(@Param('id') id: string) {
    return this.taskService.getStudentMark(+id);
  }


  @UseGuards(JwtAuthenticationGuard)
  @Get('total-mark/:id')
  async totalMark(@Param('id') id: string) {
    return this.taskService.getTotalMark(+id);
  }


  @UseGuards(JwtAuthenticationGuard)
  @Get('subject-task/:id')
  async getCountAll(@Param('id') id: string) {
    return this.taskService.countTask(+id);
  }


  @UseGuards(JwtAuthenticationGuard)
  @Get('new-try/:id')
  @ApiOperation({ summary: "Начать новую попытку" })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Должен быть ID таска, который уже существует в базе данных',
    type: Number
  })
  async newTry(@Param('id') id: string) {
    return await this.taskService.startNewTry(+id);
  }
}
