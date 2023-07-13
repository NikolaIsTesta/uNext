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

  update(id: number, updateTextAnswerDto: UpdateTextAnswerDto) {
    return `This action updates a #${id} textAnswer`;
  }

  remove(id: number) {
    return `This action removes a #${id} textAnswer`;
  }
}
