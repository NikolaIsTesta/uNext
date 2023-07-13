import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { SubjectsModule } from '../subjects/subjects.module';

@Module({
  imports:[SubjectsModule],
  controllers: [PhotoController],
  providers: [PhotoService]
})
export class PhotoModule {}
