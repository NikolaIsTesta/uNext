import { Module } from '@nestjs/common';
import { TextAnswerService } from './text-answer.service';
import { TextAnswerController } from './text-answer.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TextAnswerController],
  providers: [TextAnswerService]
})
export class TextAnswerModule {}
