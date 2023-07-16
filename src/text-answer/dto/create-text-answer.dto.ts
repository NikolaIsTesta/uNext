import { IsNumber, IsString, isEmail, isString } from 'class-validator';
export class CreateTextAnswerDto {
    @IsString()
    answer:      string
    @IsNumber()
    mark:        number
    userAnswer:  string 
    @IsNumber()    
    id_question: number
}

export default CreateTextAnswerDto;