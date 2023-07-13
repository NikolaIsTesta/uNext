import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateFileDto {
    key :  string;
    url :  string;
}
