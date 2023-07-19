import { PublicFile } from '@prisma/client';
import { DateTime } from 'aws-sdk/clients/devicefarm';
import { IsNotEmpty, IsString, isEmail, isString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  name: string;
  @IsString()
  password: string;
  studentMark?: number;
}

export default CreateUserDto;
