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
  async create(createTaskDto: CreateTaskDto, userId:number) {
    const task = await this.prismaService.task.create({
      data: createTaskDto,
    });
    await this.prismaService.studentResult.create({
      data:{
        id_task: task.id,
        id_student: userId,
        attempts: task.trying
      }
    })
  }

  async startNewTry(taskId: number, userId:number) {
    const studentResult = await this.prismaService.studentResult.findFirst({where:{id_task:taskId, id_student:userId}})
    if (--studentResult.attempts < 0)
    {
      throw new HttpException(
        'attempts are over',
        HttpStatus.BAD_REQUEST,
      );
    }
    
    await this.prismaService.studentResult.update({
      where:{
        id: studentResult.id
      },
      data:studentResult
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
        userOptionAnswer: true,
        id_task: taskId
      }
    })
    const studentResult = await this.prismaService.studentResult.findFirst({where:{id_student:userId, id_task: taskId}})
    await this.prismaService.studentResult.update({
      where:{
        id: studentResult.id
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
        id:taskId,
      },
      data:{
        totalMark:totalTaskMark
      }
    })
    return totalTaskMark
  }

  async updateTrying(taskId:number, newTrying: number, userId: number)
  {
    if (newTrying <= 0)
    {
      throw new HttpException(
        'newTrying must be a positive',
        HttpStatus.BAD_REQUEST,
      );
    }
      await this.prismaService.task.update({
        where:{
          id: taskId
        },
        data:{
          trying: newTrying
        }
      })
      const studentResult = await this.prismaService.studentResult.findFirst({where:{ id_student: userId,  id_task: taskId}})
      await this.prismaService.studentResult.update({
        where:{
          id: studentResult.id
        },
        data:{
          attempts: newTrying
        }
      })
  } 

  async updateStudentMark(taskId: number, newMark: number, userId: number) {
    const totalMark = await this.getTotalMark(taskId)
    if (newMark > totalMark)
      newMark = totalMark
      const studentResult = await this.prismaService.studentResult.findFirst({where:{ id_student: userId,  id_task: taskId}})  
    await this.prismaService.studentResult.update({
      where:{
        id:studentResult.id
    },
      data:{
        studentMark: newMark
      }
  })
  }
}
