import { Module } from '@nestjs/common';
import { UserAnswerService } from './user-answer.service';
import { UserAnswerController } from './user-answer.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserAnswerController],
  providers: [UserAnswerService],
  exports: [UserAnswerService]
})
export class UserAnswerModule {}
