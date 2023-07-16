import { IsNumber, IsString, isEmail, isString } from 'class-validator';
export class CreateTaskDto {
  @IsString()
  description: string;
  @IsString()
  title: string;
  @IsNumber()
  id_subject: number;
}

export default CreateTaskDto;