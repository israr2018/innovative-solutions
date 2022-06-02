import * as mongoose from 'mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

const FILE_NAME = 'database.providers.ts';

export const databaseProviders = [
  {
    provide: 'MONGODB_PROVIDER',
    imports: [ConfigModule],
    useFactory: async (
      configService: ConfigService,
    ): Promise<typeof mongoose> => {
      let connection: mongoose.Mongoose = null;
      let retryCount = 0;
      do {
        try {
          connection = await mongoose.connect(
            configService.get<string>('NODE_ENV') === 'test'
              ? configService.get<string>('DB.MONGODB_TEST_URL')
              : configService.get<string>('DB.MONGODB_URL'),
            {},
          );
        } catch (err) {
          retryCount++;
          console.log(retryCount);
        }
      } while (connection === null);

      mongoose.connection.on('connected', () => {
        console.log({
          app_message: 'MONGODB_CONNECTED',
          log_info: {},
        });
      });

      mongoose.connection.on('reconnected', () => {
        console.log({
          app_message: 'MONGODB_RE_CONNECTED',
          log_info: {},
        });
      });

      mongoose.connection.on('disconnected', async () => {
        console.log({
          app_message: 'MONGODB_DIS_CONNECTED',
          log_info: {},
        });

        console.log({
          app_message: 'MONGODB_TRYING_RECONNECT',
          log_info: {},
        });
        connection = await mongoose.connect(
          configService.get<string>('DB.MONGODB_URL'),
          {},
        );
      });

      mongoose.connection.on('close', () => {
        console.log({
          app_message: 'MONGODB_CONNECTION_CLOSED',
          log_info: {},
        });
      });

      mongoose.connection.on('error', (error) => {
        console.log({
          app_message: 'MONGODB_CONNECTION_ERROR',
          log_info: {
            fileName: FILE_NAME,
            errorMessage: error.message,
            errorStack: error.stack,
          },
          metadata: { errorMessage: error.message },
        });
      });

      return connection;
    },
    inject: [ConfigService],
  },
];
