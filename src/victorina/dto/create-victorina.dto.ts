import { IsNumber } from 'class-validator';

export class CreateVictorinaDto {
    @IsNumber()
    id_question:    number
}
export default CreateVictorinaDto;
