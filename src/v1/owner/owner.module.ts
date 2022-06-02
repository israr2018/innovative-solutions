import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import {OwnersProvider} from './providers/owner.providers'
import { ProvidersModule } from '../mongodb/providers.module';
import { MongooseModule } from '@nestjs/mongoose';
import {OwnerSchema} from './schemas/owner.schema'
@Module({
  imports:[
    // MongooseModule.forFeature([{
    //   name:'Owner',schema:OwnerSchema
    // }])
    ProvidersModule

  ],
  controllers: [OwnerController],
  providers: [...OwnersProvider,OwnerService,]
})
export class OwnerModule {}
