import { IsDateString, IsNumber, IsString} from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  id_teacher: number;
  @IsDateString()
  deadline: Date;
}
