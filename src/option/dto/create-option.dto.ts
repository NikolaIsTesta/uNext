import { IsNumber, IsString, IsBoolean } from 'class-validator';
export class CreateOptionDto {
    @IsString()
    text:         string
    @IsBoolean()
    isCorrect:    boolean
    @IsNumber()
    mark:         number
    userAnswer:   boolean
    @IsNumber()
    id_victorina: number
    id_task:      number
}

export default CreateOptionDto;
