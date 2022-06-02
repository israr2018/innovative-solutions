import { ApiProperty } from '@nestjs/swagger';
export class MovieDto {
@ApiProperty()
name:string;

@ApiProperty()
genera:string;

@ApiProperty()
releaseDate:Date;
}
