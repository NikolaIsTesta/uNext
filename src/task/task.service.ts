import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { totalmem } from 'os';

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



  findAll() {
    return `This action returns all task`;
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

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
  async MaxMark(taskId: number) {
    const task = await this.prismaService.task.findFirst({
      where: {
        questions: {
          some: {
            textAnswers: {
              some: {
                id: 9
              }
            },
          },
        },
      },
      // include: {
      //   questions: {
      //     include: {
      //       textAnswers: true
      //     }
      //   }
      // }
    })
    /*await this.prismaService.task.update({
      where: { id: task.id },
      data: {
        totalMark: {
          increment: textAnswer.mark // увеличиваем значение поля totalMark на option.mark
        }
      },
    });*/

// https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#filter-conditions-and-operators
// https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#filter-conditions-and-operators
    console.log(task);




    return task
  }
}

