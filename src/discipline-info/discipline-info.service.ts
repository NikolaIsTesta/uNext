import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { SubjectsService } from 'src/subjects/subjects.service';




@Injectable()
export class DisciplineInfoService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly subjectsService: SubjectsService,
    private readonly usersService: UsersService,
  ) {}




   async subscribe(subjectId, studentId) {
    const subscribed = await this.prismaService.disciplineInfo.findMany({
      where:
      {
        id_student: studentId,
        id_subject: subjectId
      }
    })

    if (subscribed.length != 0) {
          throw new HttpException('User has already subscribed to the course', HttpStatus.BAD_REQUEST);
        }
        return await this.prismaService.disciplineInfo.create({
          data: {
            id_student: studentId,
            id_subject: subjectId,
          }   
        });   
    }




  async allSub(subjectId: number) {
      return await this.prismaService.disciplineInfo.findMany({
      where:{
        id_subject:subjectId
      },
      select: {
        student: true
      }
    })
  }




  async allSign(studentId: number) {
      return await this.prismaService.disciplineInfo.findMany({
        where: {
          id_student: studentId,
        },
        select: {
          subject: true
        },
      });
   }




  async findOneUser(studentId: number, userId: number) {
    const discipline = await this.prismaService.disciplineInfo.findMany({
      where:{
        id_student: userId,
        id_subject: studentId
      }
    })
    if (discipline.length != 0)
        return true
    return false
    
  }




   async dateCheck(subjectId) {
    const subject = await this.subjectsService.findOne(subjectId); 
    const serverTime = new Date();
    if (serverTime.getTime() > subject.deadline.getTime())
    {
      throw new HttpException(
        'time is up you can not subscribe anymore',
        HttpStatus.FORBIDDEN,)
    }
   }

}
