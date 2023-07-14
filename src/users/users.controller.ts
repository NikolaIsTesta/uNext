import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { ApiTags } from '@nestjs/swagger';
import RoleGuard from 'src/guards/checkingRoles.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RoleGuard('ADMIN'))
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(RoleGuard('ADMIN'))
  async findOne(@Param('id') id: string) {
    return this.usersService.getById(Number(id));
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }


  @Post('avatar')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(@Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.addAvatar(request.user.id, file.buffer, file.originalname);
  }

  @Post('get_avatar')
  @UseGuards(JwtAuthenticationGuard)
  async getAvatar(@Req() request: RequestWithUser) {
    return this.usersService.getAvatar(request.user.id)
  }
}
