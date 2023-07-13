import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserAnswerModule } from 'src/user-answer/user-answer.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [PrismaModule, UserAnswerModule, TaskModule],
  controllers: [OptionController],
  providers: [OptionService]
})
export class OptionModule {}
