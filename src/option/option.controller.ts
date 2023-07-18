import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { ApiTags } from '@nestjs/swagger';
import { TaskService } from 'src/task/task.service';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';

@ApiTags('option')
@Controller('option')
export class OptionController {
  constructor(
    private readonly taskService: TaskService,
    private readonly optionService: OptionService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionService.create(createOptionDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('from-vica/:id')
  async questVictotina(@Param('id') id: number) {
    return this.optionService.findVictorinaOption(Number(id));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionService.findOne(+id);
  }
  @UseGuards(JwtAuthenticationGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOptionDto: CreateOptionDto) {
    return this.optionService.update(+id, updateOptionDto);
  }
  
  @UseGuards(JwtAuthenticationGuard)
  @Patch('check/:id')
  async checkAnswer(@Param('id') id: string, studentAnswer: any) {
    return await this.optionService.checkingAnswer(+id, studentAnswer.userAnswer);
  }
}
