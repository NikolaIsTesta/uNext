import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import User from './user.entity';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './users.controller';
import { FilesModule } from 'src/files/files.module';
import { DisciplineInfoModule } from 'src/discipline-info/discipline-info.module';

@Module({
  imports: [FilesModule, PrismaModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
