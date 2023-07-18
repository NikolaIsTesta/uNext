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
  ) { }
  async create(createOptionDto: CreateOptionDto) {
    const victorina = await this.prismaService.victorina.findUnique({where:{id:createOptionDto.id_victorina}})
    if (createOptionDto.isCorrect == false)
      createOptionDto.mark = 0
    createOptionDto.id_task = victorina.id_task
    return await this.prismaService.option.create({
      data: createOptionDto,
    });
  }

  async findVictorinaOption(victorinaId: number) {
    return await this.prismaService.option.findMany({
      where: {
        id_victorina: victorinaId
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
  
  async update(OptionId: number, updateOptionDto: UpdateOptionDto) {
    const option = await this.findOne(OptionId);
      await this.prismaService.option.update({
      where: { id: OptionId },
      data: updateOptionDto,
     });
  }



  async checkingAnswer(OptionId: number, studentAnswer: boolean) {
    await this.prismaService.option.update({
    where: { id: OptionId },
    data: {
      userAnswer: studentAnswer
    }})
  }
}
