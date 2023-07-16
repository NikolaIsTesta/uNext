import { IsNumber, IsString, IsBoolean } from 'class-validator';
export class CreateOptionDto {
    @IsString()
    Text:         string
    @IsBoolean()
    isCorrect:    boolean
    @IsNumber()
    mark:         number
    userAnswer:   boolean
    @IsNumber()
    id_victorina: number
}

export default CreateOptionDto;
