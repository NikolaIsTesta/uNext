import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { totalmem } from 'os';
import { trusted } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }
  async create(createTaskDto: CreateTaskDto) {
    const newTask = await this.prismaService.task.create({
      data: createTaskDto,
    });
    return newTask;
  }

  async allSubTask(sub_id: number) {
    return await this.prismaService.task.findMany({
      where: {
        id_subject: sub_id
      }
    })
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


  async test() {
    // const task1 = await this.prismaService.task.findMany({
    //   where:{
    //     id: 1
    //   },
    //   include:{
    //     questions:{
    //       include:{
    //         victorines:{
    //           include:{
    //             options:true
    //           }
    //         }
    //       }
    //     }
    //   }
    // })

    // const option = await this.prismaService.option.aggregate({
    //   _sum:{
    //     mark: true
    //   },
    // })
 // console.log(task1[0].questions[0].)
}




}
