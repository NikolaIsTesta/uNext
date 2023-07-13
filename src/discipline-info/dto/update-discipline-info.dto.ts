import { PartialType } from '@nestjs/swagger';
import { CreateDisciplineInfoDto } from './create-discipline-info.dto';

export class UpdateDisciplineInfoDto extends PartialType(CreateDisciplineInfoDto) {}
