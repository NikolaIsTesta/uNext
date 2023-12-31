import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTextAnswerDto } from './dto/create-text-answer.dto';
import { UpdateTextAnswerDto } from './dto/update-text-answer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserAnswerService } from '../user-answer/user-answer.service';
import { TaskService } from 'src/task/task.service';
import { QuestionService } from '../question/question.service';


@Injectable()
export class TextAnswerService {
  constructor(
    private readonly taskService: TaskService,
    private readonly prismaService: PrismaService,
    private readonly questionService: QuestionService,
  ) { }
  async create(createTextAnswerDto: CreateTextAnswerDto) {
    const question = await this.questionService.findOne(Number(createTextAnswerDto.id_question));
    if (question.type == "TEXTANSWER")
    {
      createTextAnswerDto.id_task = question.id_task;
      return await this.prismaService.textAnswer.create({
       data: createTextAnswerDto,
       })
    }
    else{
      throw new HttpException(
        'The type of question is not a VICTORINA',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async questTextAnswer(questionId: number) {
    return await this.prismaService.textAnswer.findFirst({
      where: {
        id_question: questionId
      }
    })
  }

  async findOne(id: number) {
    const textAnswer = await this.prismaService.textAnswer.findUnique({
      where: {
        id,
      },
    });
    if (textAnswer) {
      return textAnswer;
    }
    throw new HttpException(
      'TextAnswer with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(textAnswerID: number, updateTextAnswerDto: UpdateTextAnswerDto) {
      await this.prismaService.textAnswer.update({
      where: { id: textAnswerID },
      data: updateTextAnswerDto,
     });
  }


  async ckeckingAnswer(textAnswerID: number, studentAnswer: string) {
    const textAnswer = await this.prismaService.textAnswer.update({
    where: { id: textAnswerID },
    data: {
      userAnswer: studentAnswer,
    }
   })
  }
}
