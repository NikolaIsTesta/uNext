import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TypeOfQuestion } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateQuestionDto from './dto/create-question.dto';
import {  UserAnswerService } from '../user-answer/user-answer.service';

@Injectable()
export class QuestionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userAnswerService: UserAnswerService,
  ) {}



  async create(createQuestionDto: CreateQuestionDto,  userId: number) {
    this.userAnswerService.create(createQuestionDto.id_task, userId)
    return await this.prismaService.question.create({
     data: createQuestionDto,
    })
   }


  async findTaskQuestion(task_id: number) {
    return await this.prismaService.question.findMany({
      where:{
        id_task:task_id
      }
    })
  }

  async findOne(id: number) {
    const question = await this.prismaService.question.findUnique({
      where: {
        id,
      },
    });
    if (question) {
      return question;
    }
    throw new HttpException(
      'Question with this id does not exist',
      HttpStatus.NOT_FOUND,
    );;
  }

}
