import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTextAnswerDto } from './dto/create-text-answer.dto';
import { UpdateTextAnswerDto } from './dto/update-text-answer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserAnswerService } from '../user-answer/user-answer.service';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class TextAnswerService {
  constructor(
    private readonly taskService: TaskService,
    private readonly prismaService: PrismaService,
  ) {}
  async create(createTextAnswerDto: CreateTextAnswerDto) {
    return await this.prismaService.textAnswer.create({
      data: createTextAnswerDto,
    });
  }

  async questTextAnswer(question_id: number) {
    return await this.prismaService.textAnswer.findMany({
      where:{
        id_question:question_id
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

  async update(id: number, updateTextAnswerDto: UpdateTextAnswerDto) {
    const option = await this.findOne(id);

    // const newOption = await this.prismaService.option.update({
    //   where: { id: id },
    //   data: updateOptionDto,
    // });
    const textAnswer = await this.prismaService.textAnswer.findUnique({where: {id:id}});  
    console.log(textAnswer);
    console.log(updateTextAnswerDto);
    if (textAnswer.answer == updateTextAnswerDto.userAnswer) {

      const question = await this.prismaService.question.findUnique({ where: { id: textAnswer.id_question } });
      console.log(question);
    // console.log(question)
      const task = await this.prismaService.task.findUnique({ where: { id: question.id_task } });
      // console.log(task)
      await this.prismaService.task.update({
        where: { id: task.id },
        data: { totalMark: {
          increment: textAnswer.mark // увеличиваем значение поля totalMark на option.mark
        } },
      });
      const newAnswer = await this.prismaService.textAnswer.update({
           where: { id: id },
           // eslint-disable-next-line prettier/prettier
           data: updateTextAnswerDto
         });
         return newAnswer
    }
  }
  

  remove(id: number) {
    return `This action removes a #${id} textAnswer`;
  }

}
