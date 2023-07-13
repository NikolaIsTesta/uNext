import { PartialType } from '@nestjs/swagger';
import { CreateTextAnswerDto } from './create-text-answer.dto';

export class UpdateTextAnswerDto extends PartialType(CreateTextAnswerDto) {}
