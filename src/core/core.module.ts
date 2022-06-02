import { Module, Global } from '@nestjs/common';
import { BaseRepository } from './repository';
import { LoggerHelper } from '../core/helpers/LoggerHelper'
import { RedisCacheModule } from '../core/cache/cache.module';

@Global()
@Module({
  imports: [RedisCacheModule],
  providers: [BaseRepository, LoggerHelper],
  exports: [BaseRepository, LoggerHelper, RedisCacheModule],
})
export class CoreModule {}
