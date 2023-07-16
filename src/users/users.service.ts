import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class UsersService {

  constructor(
    private readonly filesService: FilesService,
    private readonly prismaService: PrismaService,
  ) { }

  static findOne(userId: any) {
    throw new Error('Method not implemented.');
  }




  async remove(id: number) {
    return await this.prismaService.user.delete({
      where: { id: id },
    });
  }




  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: { id: id },
      data: updateUserDto,
    });
  }




  async findAll() {
    return await this.prismaService.user.findMany();
  }
  

  async getByEmail(email: string) {
    const student = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (student) {
      return student;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }




  async create(studentData: CreateUserDto) {
    const defaultFile = await this.filesService.getById(1);
     if (!defaultFile)
        await this.filesService.create(undefined)
    const newUser = await this.prismaService.user.create({
      data: studentData,
    });
    
    return newUser;
  }

  async getById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
    const avatar = await this.filesService.uploadPublicFile(imageBuffer, filename);
    const user = await this.getById(userId);
    if (user.id_avatar != 1)
      this.filesService.deletePublicFile(user.id_avatar);
    user.id_avatar = avatar.id;
    await this.prismaService.user.update({
      where: { id: userId },
      data: user
    });
    return avatar;
  }

  async getAvatar(userId: number) {
    const user = await this.getById(userId);
    const file = this.filesService.getById(user.id_avatar);
    return (await file).url;
  }
}
