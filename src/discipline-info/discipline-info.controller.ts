import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { DisciplineInfoService } from './discipline-info.service';
import { CreateDisciplineInfoDto } from './dto/create-discipline-info.dto';
import { UpdateDisciplineInfoDto } from './dto/update-discipline-info.dto';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';

@Controller('discipline-info')
export class DisciplineInfoController {
  constructor(private readonly disciplineInfoService: DisciplineInfoService) {}

  @Get('subscribers/:id')
  @UseGuards(JwtAuthenticationGuard)
  allSubscribers(@Param('id') id: string) {
    return this.disciplineInfoService.allSub(+id);
  }



  @Get('subscriptions')
  @UseGuards(JwtAuthenticationGuard)
  allSubscriptions(@Req() request: RequestWithUser) {
    return this.disciplineInfoService.allSign(request.user.id);
  }




  @Get('subscribe/:id')
  @UseGuards(JwtAuthenticationGuard)
  async subcribe(@Param('id') subject_id: number, @Req() request: RequestWithUser) {
    await this.disciplineInfoService.dateCheck(Number(subject_id));
    return this.disciplineInfoService.subscribe(Number(subject_id), request.user.id)
  }





  @Get('find-subscriber/:id')
  @UseGuards(JwtAuthenticationGuard)
  findUser(@Param('id') id: string, @Req() request: RequestWithUser) {
    return this.disciplineInfoService.findOneUser(+id, request.user.id);
  }
}
