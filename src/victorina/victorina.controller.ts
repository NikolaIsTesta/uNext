import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VictorinaService } from './victorina.service';
import { ApiTags } from '@nestjs/swagger';
import CreateVictorinaDto from './dto/create-victorina.dto';

@ApiTags('victorina')
@Controller('victorina')
export class VictorinaController {
  constructor(private readonly victorinaService: VictorinaService) {}

  @Post()
  create(@Body() createVictorinaDto: CreateVictorinaDto) {
    return this.victorinaService.create(createVictorinaDto);
  }

  @Get('from-question/:id')
  async questVictotina(@Param('id') id: number) {
    return this.victorinaService.findQuestionVictorina(Number(id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.victorinaService.findOne(+id);
  }

}
