import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { SubjectsService } from '../subjects/subjects.service';
import * as fs from 'fs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('photo')
export class PhotoController {
  constructor(
    private readonly photoService: PhotoService,
    private readonly subjectsService: SubjectsService,
  ) {}

  @Post()
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photoService.create(createPhotoDto);
  }

  @Get()
  findAll() {
    return this.photoService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoService.remove(+id);
  }

  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const fileExtension = file.originalname.split('.')[1];
          const newFileName = name + '.' + fileExtension;
          callback(null, newFileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(null, false);
        }
        callback(null, true);
      },
    }),
  )
  @UseGuards(JwtAuthenticationGuard)
  async uploadFoto(@Param('id') id, @UploadedFile() file: Express.Multer.File) {
    const subject = await this.subjectsService.findOne(Number(id));
    subject.storage = file.path;
    this.subjectsService.update(subject.id, subject);
  }
  @Get(':id')
  async getImage(@Param('id') id, @Res() res) {
    const subject = await this.subjectsService.findOne(Number(id));
    let name = path.basename(subject.storage);
    let response: any;
    try {
      fs.accessSync(subject.storage, fs.constants.F_OK);
      response = res.sendFile(name, { root: './uploads' });
    } catch (err) {
      name = 'default.jpg';
      response = res.sendFile(name, { root: './uploads' });
    }
    return {
      data: response,
    };
  }
}
