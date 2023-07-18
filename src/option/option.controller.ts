import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { ApiTags } from '@nestjs/swagger';
import { TaskService } from 'src/task/task.service';

@ApiTags('option')
@Controller('option')
export class OptionController {
  constructor(
    private readonly taskService: TaskService,
    private readonly optionService: OptionService) {}

  @Post()
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionService.create(createOptionDto);
  }

  @Get('from-vica/:id')
  async questVictotina(@Param('id') id: number) {
    return this.optionService.findVictorinaOption(Number(id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOptionDto: CreateOptionDto) {
    return this.optionService.update(+id, updateOptionDto);
  }
  

  @Patch('check/:id')
  async checkAnswer(@Param('id') id: string, studentAnswer: any) {
    return await this.optionService.checkingAnswer(+id, studentAnswer.userAnswer);
  }
}
