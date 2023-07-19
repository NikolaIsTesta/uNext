import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { QuestionService } from './question.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
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

  @UseGuards(JwtAuthenticationGuard)
  @Get('option/mark/:id')
  @ApiOperation({ summary: "Получить оценку за определенный вопрос." })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Должен быть ID question, который уже существует в базе данных. Первой приходит оценка пользователя за вопрос, второй максимальный балл за задание',
    type: Number
  })
  async getMark(@Param('id') id: string, @Req() request: RequestWithUser) {
    return await this.questionService.getQuestionMark(+id, request.user.id);
  }
}
