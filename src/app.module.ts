import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import config from './config/configuration';
import { Customer } from './entity/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessLog } from './entity/accesss.log.entity';
import { MongooseModule } from '@nestjs/mongoose';
// import { MYSQL } from './config/configuration';
import { ProvidersModule } from './v1/mongodb/providers.module';
import { MoviesModule } from './v1/movies/movies.module';
import { CustomerModule } from './v1/customer/customer.module';
import { AccesslogModule } from './v1/accesslog/accesslog.module';
import { MysqlModule } from './v1/mysql/mysql.module';
import { ResponseModule } from './core/response/resonse.module';
import { CoreModule } from './core/core.module';
import {V1Module} from './v1/v1.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    // Customer DB CONNECTION
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => {
    //     return {
    //       type: 'mysql',
    //       host: configService.get('MYSQL.MAIN_DB_HOST'),
    //       port: configService.get('MYSQL.MAIN_DB_PORT'),
    //       database: configService.get('MYSQL.DB_NAME'),
    //       username: configService.get('MYSQL.USER_NAME'),
    //       password: configService.get('MYSQL.PASSWORD'),
    //       entities: [Customer],
    //       synchronize: true,
    //     };
    //   },
    // }),
    // SECONDARY DB CONNECTION
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   name: 'secondaryDB',
    //   useFactory: async (configService: ConfigService) => {
    //     return {
    //       type: 'mysql',
    //       host: configService.get('MYSQL.MAIN_DB_HOST'),
    //       port: configService.get('MYSQL.MAIN_DB_PORT'),
    //       database: configService.get('MYSQL.SECONDARY_DB_DATABASE'),
    //       username: configService.get('MYSQL.SECONDARY_DB_USERNAME'),
    //       password: configService.get('MYSQL.SECONDARY_DB_PASSWORD'),
    //       entities: [AccessLog],
    //       synchronize: true,
    //     };
    //   },
    // }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('NODE_ENV') === 'test'
            ? configService.get<string>('DB.MONGODB_URL')
            : configService.get<string>('DB.MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    CoreModule,
    // ProvidersModule,
    // CustomerModule,
    // AccesslogModule,
    // MoviesModule,
    // AccesslogModule,
    // MysqlModule
    V1Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

