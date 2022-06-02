import { ApiProperty } from '@nestjs/swagger';
export class CreateCustomerDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  CustomerId: string;
}
