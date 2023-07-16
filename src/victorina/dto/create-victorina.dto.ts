import { IsNumber } from 'class-validator';

export class CreateVictorinaDto {
    @IsNumber()
    id_question:    number
    id_task:    number
}
export default CreateVictorinaDto;
