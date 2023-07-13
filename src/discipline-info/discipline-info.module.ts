import { Module } from '@nestjs/common';
import { DisciplineInfoService } from './discipline-info.service';
import { DisciplineInfoController } from './discipline-info.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [DisciplineInfoController],
  providers: [DisciplineInfoService],
  exports: [DisciplineInfoService],
})
export class DisciplineInfoModule {}
