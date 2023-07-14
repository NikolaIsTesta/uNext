import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserAnswerService } from '../user-answer/user-answer.service';

@Injectable()
export class OptionService {
  MaxMark(arg0: number) {
    throw new Error('Method not implemented.');
  }
  prisma: any;
  constructor(
    private readonly userAnswerService: UserAnswerService,
    private readonly prismaService: PrismaService,
  ) {}
  async create(createOptionDto: CreateOptionDto) {
    return await this.prismaService.option.create({
      data: createOptionDto,
    });
  }

  async findVictorinaOption(victorin_id: number) {
    return await this.prismaService.option.findMany({
      where:{
        id_victorina:victorin_id
      }
    })
  }

  async findOne(id: number) {
    const option = await this.prismaService.option.findUnique({
      where: {
        id,
      },
    });
    if (option) {
      return option;
    }
    throw new HttpException(
      'Option with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  async update(id: number) {
    const option = await this.findOne(id);

    // const newOption = await this.prismaService.option.update({
    //   where: { id: id },
    //   data: updateOptionDto,
    // });
    if (option.isCorrect == true) {

      
      const option = await this.prismaService.option.findUnique({where: {id:id}});
      // console.log(option)
      option.userAnswer = true;
      const victorina = await this.prismaService.victorina.findUnique({ where: { id: option.id_victorina } });
      
      console.log(victorina)
      const question = await this.prismaService.question.findUnique({ where: { id: victorina.id_question } });
      
    // console.log(question)
      const task = await this.prismaService.task.findUnique({ where: { id: question.id_task } });
      // console.log(task)
      await this.prismaService.task.update({
        where: { id: task.id },
        data: { totalMark: {
          increment: option.mark // увеличиваем значение поля totalMark на option.mark
        } },
      });
      const newOption = await this.prismaService.option.update({
           where: { id: id },
           // eslint-disable-next-line prettier/prettier
           data: option
         });
         return newOption
    }
  }
}
