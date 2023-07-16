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

  async questTextAnswer(question_id: number) {
    return await this.prismaService.textAnswer.findMany({
      where: {
        id_question: question_id
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
    await this.prismaService.textAnswer.update({
    where: { id: textAnswerID },
    data: {
      userAnswer: studentAnswer,
    }
   });
   const textAnswer = await this.findOne(textAnswerID);
   console.log(studentAnswer)
   const newMark = textAnswer.mark;
   let userMark: any
  if (textAnswer.answer == textAnswer.userAnswer)
    userMark = textAnswer.mark;
  else
    userMark = 0;
  this.updateMark(textAnswerID, newMark, userMark)
  }



  async updateMark(textAnswerID: number, totalMark: number, studentMark: number) {
    const task = await this.prismaService.task.findFirst({
      where: {
        questions: {
          some: {
            textAnswers: {
              some: {
                id: textAnswerID
              }
            },
          },
        },
      },
    })

    await this.prismaService.task.update({
      where: { id: task.id },
      data: {
        totalMark: {
          increment: totalMark
        }
      },
    });

    await this.prismaService.task.update({
      where: { id: task.id },
      data: {
        studentMark: {
          increment: studentMark
        }
      },
    });
  }

}
