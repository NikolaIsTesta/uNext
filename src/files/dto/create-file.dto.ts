import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateFileDto {
    @IsString()
    key :  string;
    @IsString()
    url :  string;
}
