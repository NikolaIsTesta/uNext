import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { totalmem } from 'os';
import { trusted } from 'mongoose';
import { elementAt } from 'rxjs';

@Injectable()
export class TaskService {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }
  async create(createTaskDto: CreateTaskDto) {
    return await this.prismaService.task.create({
      data: createTaskDto,
    });
  }

  async allSubTask(subId: number) {
    return await this.prismaService.task.findMany({
      where: {
        id_subject: subId
      }
    })
  }


  async countTask(subId: number){
    return await this.prismaService.task.count({
      where:{
        id_subject: subId
    }})
  }


  async findOne(id: number) {
    const task = await this.prismaService.task.findUnique({
      where: {
        id,
      },
    });
    if (task) {
      return task;
    }
    throw new HttpException(
      'Task with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }


  async getStudentMark(taskId: number) {
    let studentTaskMark = 0;
    const checkTextAnswer = await this.prismaService.task.findMany({
      where:{
        id: taskId
      },
      select:{
        textAnswer:{
          select:{
            mark:true,
            userAnswer:true,
            answer:true
          }
        }
      }
    })
    checkTextAnswer.forEach(element => {
      element.textAnswer.forEach(element => {
        if (element.userAnswer == element.answer)
        {
        studentTaskMark = studentTaskMark + element.mark;
        }
      })
    })
    const optionMark = await this.prismaService.option.aggregate({
      _sum:{
        mark: true
      },
      where:{
        id_task:taskId,
        userAnswer:true,
        isCorrect:true
      }
    })

    studentTaskMark = studentTaskMark + optionMark._sum.mark;
    await this.prismaService.task.update({
      where:{
        id:taskId
      },
      data:{
        studentMark:studentTaskMark
      }
    })

  }


  async getTotalMark(taskId: number) {
     let totalTaskMark: number;
     const textMark = await this.prismaService.textAnswer.aggregate({
      _sum:{
        mark: true
      },
      where:{
        id_task:taskId
      }
    })

    const optionAllMark = await this.prismaService.option.aggregate({
      _sum:{
        mark: true
      },
      where:{
        id_task:taskId
      }
    })

    totalTaskMark = optionAllMark._sum.mark + textMark._sum.mark
    await this.prismaService.task.update({
      where:{
        id:taskId
      },
      data:{
        totalMark:totalTaskMark
      }
    })
    return totalTaskMark
  }
}
