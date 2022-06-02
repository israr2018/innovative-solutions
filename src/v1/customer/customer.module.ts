import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../../entity/customer.entity';
import { MysqlModule } from 'src/v1/mysql/mysql.module';
@Module({
  imports: [MysqlModule,TypeOrmModule.forFeature([Customer])],
  providers: [CustomerService],
  controllers: [CustomerController]
})
export class CustomerModule {}
