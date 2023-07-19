import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { totalmem } from 'os';
import { trusted } from 'mongoose';
import { elementAt } from 'rxjs';
import { notEqual } from 'assert';

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

  async startNewTry(taskId: number, userId:number) {
    const task = await this.prismaService.task.findUnique({where:{id:taskId}})
    console.log(task.trying)
    if (--task.trying <= 0)
    {
      throw new HttpException(
        'attempts are over',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prismaService.task.update({
      where:{
        id:taskId
      },
      data:task
    })
    return await this.prismaService.userAnswer.deleteMany({
      where:{
        id_student: userId
      }
    })
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


  async getStudentMark(taskId: number, userId: number) {
    const optionMark = await this.prismaService.userAnswer.aggregate({
      _sum:{
        markForOption: true
      },
      where:{
        id_student: userId,
        isCorrect: true,
        userOptionAnswer: true
      },
    })

    await this.prismaService.user.update({
      where:{
        id:userId
      },
      data:{
        studentMark:optionMark._sum.markForOption
      }
    })
    return optionMark._sum.markForOption
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
        id_task:taskId,
        isCorrect:true
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

  async updateTrying(tasId:number,newTrying: number)
  {
    console.log(tasId, newTrying)
    if (newTrying <= 0)
    {
      throw new HttpException(
        'newTrying must be a positive',
        HttpStatus.BAD_REQUEST,
      );
    }
      return await this.prismaService.task.update({
        where:{
          id: tasId
        },
        data:{
          trying: newTrying
        }
      })
  } 

  async updateStudentMark(taskId: number, newMark: number) {
    const totalMark = await this.getTotalMark(taskId)
    if (newMark > totalMark)
      newMark = totalMark
    await this.prismaService.task.update({
      where:{
      id:taskId
    },
      data:{
        studentMark: newMark
      }
  })
  }
}
