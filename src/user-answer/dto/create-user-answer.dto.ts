import { IsDate, IsNumber, IsString } from 'class-validator';
export class CreateUserAnswerDto {
    @IsNumber()
    id_student:     number
    @IsNumber()
    id_task:        number
    @IsNumber()
    id_textAnswer:  number
    @IsNumber()
    id_optionAnswer:number
    userOptionAnswer: boolean
}
export default CreateUserAnswerDto;