import { Module } from '@nestjs/common';
import { VictorinaService } from './victorina.service';
import { VictorinaController } from './victorina.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [PrismaModule, QuestionModule],
  controllers: [VictorinaController],
  providers: [VictorinaService]
})
export class VictorinaModule {}
