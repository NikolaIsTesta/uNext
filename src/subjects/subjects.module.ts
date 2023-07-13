import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { PrismaService } from '../prisma/prisma.service'; // Импортирует PrismaService
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [SubjectsController],
  providers: [SubjectsService, PrismaService], // Добавляет PrismaService в провайдеры
  exports: [SubjectsService],
})
export class SubjectsModule {}
