import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { PublicFile } from '@prisma/client'; 
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';



@Injectable()
export class FilesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(createFileDto: CreateFileDto) {
    /*if (createFileDto == null)
    {
      console.log(createFileDto)
      await this.prismaService.publicFile.create({data:{}})
    }*/
      await this.prismaService.publicFile.create({
        data: createFileDto,
      });
  }

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
      Body: dataBuffer,
      Key: `${uuid()}-${filename}`,
      'ContentType':'image/jpeg'
    })
      .promise();
    const newFile = this.prismaService.publicFile.create({
        data: {
          key: uploadResult.Key,
          url: uploadResult.Location,
        }
      });
    return newFile;
  }


  async deletePublicFile(fileId: number) {
    const file = await this.getById(fileId);
    const s3 = new S3();
    await s3.deleteObject({
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
      Key: file.key,
    }).promise();
    await this.prismaService.publicFile.delete({
      where: { id:fileId }
    })
  }

  async getById(fileId: number) {
    const file = await this.prismaService.publicFile.findUnique({
      where: {
        id:fileId,
      },
    });
    return file
  }
}