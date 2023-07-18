import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { QuestionService } from './question.service';
import { ApiTags } from '@nestjs/swagger';
import CreateQuestionDto from './dto/create-question.dto';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';

@ApiTags('question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  
  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() createQuestionDto: CreateQuestionDto, @Req() request: RequestWithUser,) {
    return this.questionService.create(createQuestionDto, request.user.id);
  }

  @Get('from-task/:id')
  async taskQuest(@Param('id') id) {
    return this.questionService.findTaskQuestion(Number(id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }
}
