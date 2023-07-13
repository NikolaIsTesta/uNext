import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OptionService {
  constructor(
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
      option.userAnswer = true;
      const newOption = await this.prismaService.option.update({
           where: { id: id },
           // eslint-disable-next-line prettier/prettier
           data: option
         });
         return newOption
    }
  }
}
