import { TypeOfQuestion } from '@prisma/client';
import { IsNumber, IsString, IsEnum } from 'class-validator';

export class CreateQuestionDto {
    @IsString()
    title:      string
    @IsEnum(TypeOfQuestion)
    type:       TypeOfQuestion
    @IsNumber()
    id_task:    number
}
export default CreateQuestionDto;
