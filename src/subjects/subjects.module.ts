// import { Module } from '@nestjs/common';
// import { SubjectsService } from './subjects.service';
// import { SubjectsController } from './subjects.controller';
// import { PrismaModule } from 'src/prisma/prisma.module';
// import { PrismaService } from 'src/prisma/prisma.service';

// @Module({
//   imports: [PrismaModule],
//   controllers: [SubjectsController],
//   providers: [SubjectsService, PrismaService],
// })
// export class SubjectsModule {}
import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { PrismaService } from '../prisma/prisma.service'; // Импортирует PrismaService

@Module({
  controllers: [SubjectsController],
  providers: [SubjectsService, PrismaService], // Добавляет PrismaService в провайдеры
})
export class SubjectsModule {}
