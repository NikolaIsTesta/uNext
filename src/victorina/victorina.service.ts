import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionService } from '../question/question.service';
import CreateVictorinaDto from './dto/create-victorina.dto';

@Injectable()
export class VictorinaService {
  constructor(
    private readonly questionService: QuestionService,
    private readonly prismaService: PrismaService,
  ) {}

  // Если вопрос не будет иметь тип викторины, то викторина не будет создана и выдаст сообшение об ошибке
  async create(createVictorinaDto: CreateVictorinaDto) {
    const question = await this.questionService.findOne(Number(createVictorinaDto.id_question));
    if (question.type == 'VICTORINA')
    {
      createVictorinaDto.id_task = question.id_task
      return await this.prismaService.victorina.create({
       data: createVictorinaDto,
       })
    }
    else{
      throw new HttpException(
        'The type of question is not a VICTORINA',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findQuestionVictorina(question_id: number) {
    return await this.prismaService.victorina.findMany({
      where:{
        id_question:question_id
      }
    })
  }

  async findOne(id: number) {
    const victorina = await this.prismaService.victorina.findUnique({
      where: {
        id,
      },
    });
    if (victorina) {
      return victorina;
    }
    throw new HttpException(
      'Victorina with this id does not exist',
      HttpStatus.NOT_FOUND,
    );;
  }
}
