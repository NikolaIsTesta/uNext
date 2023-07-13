import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[ConfigModule, PrismaModule],
  controllers: [],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
