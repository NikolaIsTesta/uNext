import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { DisciplineInfoService } from './discipline-info.service';
import { CreateDisciplineInfoDto } from './dto/create-discipline-info.dto';
import { UpdateDisciplineInfoDto } from './dto/update-discipline-info.dto';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';

@Controller('discipline-info')
export class DisciplineInfoController {
  constructor(private readonly disciplineInfoService: DisciplineInfoService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disciplineInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDisciplineInfoDto: UpdateDisciplineInfoDto) {
    return this.disciplineInfoService.update(+id, updateDisciplineInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disciplineInfoService.remove(+id);
  }

  @Post('subscribe/:id')
  @UseGuards(JwtAuthenticationGuard)
  async subcribe(@Param('id') subject_id: number, @Req() request: RequestWithUser) {
    return this.disciplineInfoService.subscribe(Number(subject_id), request.user.id)
  }
}
