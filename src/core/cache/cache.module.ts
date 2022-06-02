import { Injectable, Inject, Module, CacheModule, CACHE_MANAGER } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

export const cacheProvider = CacheModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService : ConfigService) => ({
    store: redisStore,
    host: configService.get<string>('REDIS.HOST'),
    port: configService.get<number>('REDIS.PORT'),
    auth_pass: configService.get<string>('REDIS.PASSWORD'),
    ttl: configService.get<number>('REDIS.TTL') // cache time in seconds
  }),
  inject: [ConfigService]
});

@Injectable()
export class RedisCacheManager {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async get(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }

  async set(key: string, value: string): Promise<any> {
    return this.cacheManager.set(key, value);
  }

  async cache(): Promise<Cache> {
    return this.cacheManager;
  }

  async remove(key: string): Promise<Cache> {
    try {
      return this.cacheManager.del(key);
    } catch (e) {
      return e;
    }
  }

}


@Module({
  imports: [cacheProvider],
  providers: [RedisCacheManager],
  exports: [RedisCacheManager]
})

export class RedisCacheModule { }
