import { IsNumber, IsString, isEmail, isString } from 'class-validator';
export class CreateTaskDto {
  @IsString()
  description: string;
  @IsString()
  Title: string;
  @IsNumber()
  id_subject: number;
}

export default CreateTaskDto;