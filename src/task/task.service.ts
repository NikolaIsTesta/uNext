import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { totalmem } from 'os';

@Injectable()
export class TaskService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}
async create(createTaskDto: CreateTaskDto) {
    const newTask = await this.prismaService.task.create({
      data: createTaskDto,
    });
    return newTask;
  }


  async allSubTask(sub_id: number) {
    return await this.prismaService.task.findMany({
      where:{
        id_subject:sub_id
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
  async MaxMark(id:number){
    let questions = await this.prismaService.question.findMany(
      {
        include: {
          textAnswers:{
            select: {
              mark:true
            }
          },
          victorines: true
        },
      }
    );
   
    console.log(questions);
    
    let taskTotalMark = 0;
    // questions.forEach(async question=>{
    //   if(question.type == "VICTORINA"){
    //     const victorina = await this.prismaService.victorina.findMany({where: {
    //       id_question: question.id,
    //     }});
    const sumTextAnswers = this.prismaService.question.aggregate({
      _max: {
        select: {
          textAnswer: {
            select: {
              mark: true
            }
          },
        }
      },
    })
          const options =  this.prismaService.option.aggregate({
            _max: {
              mark: true
            },
          }
          );
          taskTotalMark = (await options)._max.mark;
        
      
      // if(question.type=="TEXTANSWER"){
      //   const textAnswers = await this.prismaService.textAnswer.findMany({where: {
      //     id_question: question.id,
      //   }});
      //   textAnswers.forEach(textAnswer=>{
      //     taskTotalMark+=textAnswer.mark;
      //   })
      // }
   
    return questions;
  }
}

