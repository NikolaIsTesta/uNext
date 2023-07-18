import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VictorinaService } from './victorina.service';
import { ApiTags } from '@nestjs/swagger';
import CreateVictorinaDto from './dto/create-victorina.dto';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';

@ApiTags('victorina')
@Controller('victorina')
export class VictorinaController {
  constructor(private readonly victorinaService: VictorinaService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() createVictorinaDto: CreateVictorinaDto) {
    return this.victorinaService.create(createVictorinaDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('from-question/:id')
  async questVictotina(@Param('id') id: number) {
    return this.victorinaService.findQuestionVictorina(Number(id));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.victorinaService.findOne(+id);
  }

}
