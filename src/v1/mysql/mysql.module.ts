import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessLog } from 'src/entity/accesss.log.entity';
import { Customer } from 'src/entity/customer.entity';
@Module({
  imports:[
    //   Customer DB CONNECTION
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('MYSQL.MAIN_DB_HOST'),
          port: configService.get('MYSQL.MAIN_DB_PORT'),
          database: configService.get('MYSQL.DB_NAME'),
          username: configService.get('MYSQL.USER_NAME'),
          password: configService.get('MYSQL.PASSWORD'),
          entities: [Customer],
          synchronize: true,
        };
      },
    }),
    // SECONDARY DB CONNECTION
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        name: 'secondaryDB',
        useFactory: async (configService: ConfigService) => {
          return {
            type: 'mysql',
            host: configService.get('MYSQL.MAIN_DB_HOST'),
            port: configService.get('MYSQL.MAIN_DB_PORT'),
            database: configService.get('MYSQL.SECONDARY_DB_DATABASE'),
            username: configService.get('MYSQL.SECONDARY_DB_USERNAME'),
            password: configService.get('MYSQL.SECONDARY_DB_PASSWORD'),
            entities: [AccessLog],
            synchronize: true,
          };
        },
      }),
  ]
})
export class MysqlModule {}
