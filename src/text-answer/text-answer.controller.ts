import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TextAnswerService } from './text-answer.service';
import { CreateTextAnswerDto } from './dto/create-text-answer.dto';
import { UpdateTextAnswerDto } from './dto/update-text-answer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('text-answer')
@Controller('text-answer')
export class TextAnswerController {
  constructor(private readonly textAnswerService: TextAnswerService) {}

  @Post()
  create(@Body() createTextAnswerDto: CreateTextAnswerDto) {
    return this.textAnswerService.create(createTextAnswerDto);
  }

  @Get('from-question/:id')
  async subTasks(@Param('id') id: number) {
    return this.textAnswerService.questTextAnswer(Number(id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.textAnswerService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateTextAnswerDto) {
    return this.textAnswerService.update(+id, updateUserDto);
  }


  @Patch('check/:id')
  ckeckAnswer(@Param('id') id: string, studentAnswer: string) {
    return this.textAnswerService.ckeckingAnswer(+id, studentAnswer);
  }

}
