import { Module } from '@nestjs/common';
import { DisciplineInfoService } from './discipline-info.service';
import { DisciplineInfoController } from './discipline-info.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { SubjectsModule } from 'src/subjects/subjects.module';

@Module({
  imports: [PrismaModule, UsersModule, SubjectsModule],
  controllers: [DisciplineInfoController],
  providers: [DisciplineInfoService],
  exports: [DisciplineInfoService],
})
export class DisciplineInfoModule {}
