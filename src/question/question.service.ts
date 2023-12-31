import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TypeOfQuestion } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateQuestionDto from './dto/create-question.dto';
import {  UserAnswerService } from '../user-answer/user-answer.service';
import { trusted } from 'mongoose';
import { DateTime } from 'aws-sdk/clients/devicefarm';

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
    );
  }

  async getQuestionMark(questionId: number, userId: number,  ) {
    const quiz = await this.prismaService.victorina.findFirst({where:{id_question:questionId}})
    const optionMark = await this.prismaService.option.findFirst({
      where:{
        id_task: quiz.id_task,
        isCorrect: true,
        id_victorina: quiz.id
      }
    })
 
    const userAnswer = await this.prismaService.userAnswer.findFirst({
      where:{
        id_optionAnswer:optionMark.id,
        id_student:userId
      }
    })

    if (!userAnswer)
        return [0, optionMark.mark]
    return [userAnswer.markForOption, optionMark.mark]
  }
}
