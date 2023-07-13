import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserAnswerModule } from 'src/user-answer/user-answer.module';

@Module({
  imports: [PrismaModule, UserAnswerModule],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
