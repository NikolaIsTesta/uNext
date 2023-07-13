
import { IsNumber, IsString, isEmail, isString } from 'class-validator';
export class CreateDisciplineInfoDto {
    @IsNumber()
    id_subject:         number
    @IsNumber()
    id_student:         number
}

export default CreateDisciplineInfoDto;