import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SubjectsModule } from "src/subjects/subjects.module"
import { UsersModule } from "src/users/users.module"

@Module({
  imports: [PrismaModule, SubjectsModule, UsersModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService]
})
export class TaskModule {}
