import { Module } from '@nestjs/common';
import { AccesslogService } from './accesslog.service';
import { AccesslogController } from './accesslog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessLog } from 'src/entity/accesss.log.entity';
@Module({
  imports: [TypeOrmModule.forFeature([AccessLog], 'secondaryDB')],
  providers: [AccesslogService],
  controllers: [AccesslogController],
})
export class AccesslogModule {}
