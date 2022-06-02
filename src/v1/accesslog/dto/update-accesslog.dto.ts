import { PartialType } from '@nestjs/swagger';
import { CreateAccesslogDto } from './create-accesslog.dto';

export class UpdateAccesslogDto extends PartialType(CreateAccesslogDto) {}
