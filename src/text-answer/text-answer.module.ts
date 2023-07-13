import { Module } from '@nestjs/common';
import { TextAnswerService } from './text-answer.service';
import { TextAnswerController } from './text-answer.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserAnswerModule } from 'src/user-answer/user-answer.module';
import { TaskModule } from 'src/task/task.module';



@Module({
  imports: [PrismaModule, UserAnswerModule, TaskModule],
  controllers: [TextAnswerController],
  providers: [TextAnswerService]
})
export class TextAnswerModule {}
