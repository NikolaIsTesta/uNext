import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import TaskGuard from 'src/guards/task.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard, TaskGuard)
  create(@Req() request: RequestWithUser, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto, request.user.id);
  }

  
  @UseGuards(JwtAuthenticationGuard)
  @Get('from-sub/:id')
  async subTasks(@Param('id') id: number) {
    return this.taskService.allSubTask(Number(id));
  }


  @UseGuards(JwtAuthenticationGuard)
  @Get('student-mark/:id')
  async studentMark(@Param('id') id: string, @Req() request: RequestWithUser) {
    return this.taskService.getStudentMark(+id, request.user.id);
  }


  @UseGuards(JwtAuthenticationGuard)
  @Get('total-mark/:id')
  async totalMark(@Param('id') id: string) {
    return this.taskService.getTotalMark(+id);
  }


  @UseGuards(JwtAuthenticationGuard)
  @Get('subject-task/:id')
  async getCountAll(@Param('id') id: string) {
    return await this.taskService.countTask(+id);
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
  async newTry(@Param('id') id: string,  @Req() request: RequestWithUser) {
    return await this.taskService.startNewTry(+id, request.user.id);
  }

  @ApiOperation({ summary: "Изменить оценку пользователя вручную" })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Должен быть ID таска, который уже существует в базе данных',
    type: Number
  })

  @ApiBody({
    required: true,
    description: 'Нужно отправить :"newMark". Должа быть новая оценка юзера. При превышении максимальной оценки будет просто назначена максимальная оценка',
    examples:{
      example:{
        value:{
          newMark: 6000
        }
      }
    }
  })

  
  @UseGuards(JwtAuthenticationGuard)
  @Patch('update-mark/:id')
  async updateMark(@Param('id') id: string, @Body() newMark: any, @Req() request: RequestWithUser)
  {
    await this.taskService.updateStudentMark(+id, +newMark.newMark, request.user.id)
    return "нет, этот метод и не должен ничего возвращать, могу только деняг с php накинуть: $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('update/trying/:id')
  async updateTry(@Param('id') id: string, @Body() trying: any, @Req() request: RequestWithUser)
  {
    return await this.taskService.updateTrying(+id, trying.trying, request.user.id);
  }
}
