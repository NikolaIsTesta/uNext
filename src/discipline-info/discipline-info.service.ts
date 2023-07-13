import { Injectable } from '@nestjs/common';
import { CreateDisciplineInfoDto } from './dto/create-discipline-info.dto';
import { UpdateDisciplineInfoDto } from './dto/update-discipline-info.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { DisciplineInfo } from './entities/discipline-info.entity';

@Injectable()
export class DisciplineInfoService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
  ) {}
  async subscribe(subject_id, student_id) {
    return await this.prismaService.disciplineInfo.create({
      data: {
        id_student: student_id,
        id_subject: subject_id,
      }
    });
  }

  async allSub(sub_id: number) {
    const discipline = await this.prismaService.disciplineInfo.findMany({
      where:{
        id_subject:sub_id
      }
    })
    let subcribers = [];
    subcribers.length = discipline.length;
    for (let i = 0; i < discipline.length; i++)
    {
      subcribers[i] = await this.usersService.getById(discipline[i].id_student); 
    }
    return subcribers;
  }

  findOne(id: number) {
    return `This action returns a #${id} disciplineInfo`;
  }

  update(id: number, updateDisciplineInfoDto: UpdateDisciplineInfoDto) {
    return `This action updates a #${id} disciplineInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} disciplineInfo`;
  }

}
