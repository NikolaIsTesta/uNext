import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import PostgresErrorCode from 'src/database/postgresErrorCode.enum';

@Injectable()
export class SubjectsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createSubjectDto: CreateSubjectDto, userId: number) {
    try {
    createSubjectDto.id_teacher = userId;
    return await this.prismaService.subject.create({
      data: createSubjectDto,
    });
  } catch (error) {
    if (error?.code === PostgresErrorCode.UniqueViolation) {
      throw new HttpException('Subject with that name already exists', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  }

  async findAll() {
    return await this.prismaService.subject.findMany();
  }

  async findOne(id: number) {
    const subject = await this.prismaService.subject.findUnique({
      where: {
        id,
      },
    });
    if (subject) {
      return subject;
    }
    throw new HttpException(
      'Subject with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return await this.prismaService.subject.update({
      where: { id: id },
      data: updateSubjectDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.subject.delete({
      where: { id: id },
    });
  }

  async getByName(name: string) {
    const subjects = await this.prismaService.subject.findUnique({
      where: {
        name,
      },
    });
    if (subjects) {
      return subjects;
    }
    throw new HttpException(
      'Subject with this name does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
}
