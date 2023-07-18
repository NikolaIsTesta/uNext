import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TextAnswerService } from './text-answer.service';
import { CreateTextAnswerDto } from './dto/create-text-answer.dto';
import { UpdateTextAnswerDto } from './dto/update-text-answer.dto';
import { ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';

@ApiTags('text-answer')
@Controller('text-answer')
export class TextAnswerController {
  constructor(private readonly textAnswerService: TextAnswerService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() createTextAnswerDto: CreateTextAnswerDto) {
    return this.textAnswerService.create(createTextAnswerDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('from-question/:id')
  async subTasks(@Param('id') id: number) {
    return this.textAnswerService.questTextAnswer(Number(id));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.textAnswerService.findOne(+id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateTextAnswerDto) {
    return this.textAnswerService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch('check/:id')
  ckeckAnswer(@Param('id') id: string, @Body() studentAnswer: any) {
    return this.textAnswerService.ckeckingAnswer(+id, studentAnswer.userAnswer);
  }
}