import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDisciplineInfoDto } from './dto/create-discipline-info.dto';
import { UpdateDisciplineInfoDto } from './dto/update-discipline-info.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { DisciplineInfo } from './entities/discipline-info.entity';
import { SubjectsService } from 'src/subjects/subjects.service';

@Injectable()
export class DisciplineInfoService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly subjectsService: SubjectsService,
    private readonly usersService: UsersService,
  ) {}

   async subscribe(subject_id, student_id) {
    const subscribed = await this.prismaService.disciplineInfo.findMany({
      where:
      {
        id_student: student_id,
        id_subject: subject_id
      }
    })

    if (subscribed.length != 0) {
          throw new HttpException('User has already subscribed to the course', HttpStatus.BAD_REQUEST);
        }
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

  async allSign(student_id: number) {
    const discipline = await this.prismaService.disciplineInfo.findMany({
      where:{
        id_student:student_id
      }
    })
    let subjects = [];
    subjects.length = discipline.length;
    for (let i = 0; i < discipline.length; i++)
      subjects[i] = await this.subjectsService.findOne(discipline[i].id_subject); 
    return subjects;
  }


  async findOneUser(subject_id: number, user_id: number) {
    const discipline = await this.prismaService.disciplineInfo.findMany({
      where:{
        id_student: user_id,
        id_subject: subject_id
      }
    })
    if (discipline.length == 0)
      return false
    return true
  }


   async dateCheck(subject_id) {
    const subject = await this.subjectsService.findOne(subject_id); 
    const serverTime = new Date();
    console.log(serverTime);
     console.log(serverTime.getTime());
     console.log(subject.deadline);
     console.log(subject.deadline.getTime());
    if (serverTime.getTime() > subject.deadline.getTime())
    {
      throw new HttpException(
        'time is up you can not subscribe anymore',
        HttpStatus.FORBIDDEN,)
    }
   }

  update(id: number, updateDisciplineInfoDto: UpdateDisciplineInfoDto) {
    return `This action updates a #${id} disciplineInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} disciplineInfo`;
  }

}
