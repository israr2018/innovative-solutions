import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customerId: string;

  @Column()
  name: string;

  timestamp: number;
}
