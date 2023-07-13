import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserAnswerDto } from './dto/create-user-answer.dto';
import { UpdateUserAnswerDto } from './dto/update-user-answer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserAnswerService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}
  // Автоматически заполняется student_id
  async create(userId: number) {
    //createUserAnswerDto.id_student = userId;
    return await this.prismaService.userAnswer.create({
      data: {
        id_student: userId,
      }
    });
  }

  async findOne(id: number) {
    const userAnswer = await this.prismaService.userAnswer.findUnique({
      where: {
        id,
      },
    });
    if (userAnswer) {
      return userAnswer;
    }
    throw new HttpException(
      'UserAnswer with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  
}
