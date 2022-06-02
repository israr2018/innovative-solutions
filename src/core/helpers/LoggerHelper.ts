import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';

type LogType = {
  app_message: string;
  log_info?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
};

const NODE_ENV = process.env.NODE_ENV;
const dirName = './logs/';

const transports = [];

transports.push(
  new winston.transports.File({ filename: dirName + 'combined.log' }),
);

if (NODE_ENV === 'development') {
  transports.push(new winston.transports.Console());
}

const configureLogger = () => {
  const LoggerInstance = winston.createLogger({
    level: 'debug',
    levels: winston.config.npm.levels,
    format: winston.format.combine(
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json(),
    ),
    transports: transports,
  });

  return LoggerInstance;
};

const logger = configureLogger();

@Injectable()
export class LoggerHelper {
  private readonly name: string;

  constructor(private configService: ConfigService) {
    this.name = this.configService.get<string>('APP_NAME');
  }

  private __format(payload: LogType) {
    const info = payload.log_info || {};
    const metadata = payload.metadata || {};
    const appMessage = payload.app_message || '';

    if (metadata && metadata.orderId) {
      metadata.orderId = metadata.orderId.toString();
    }

    return {
      time: Date.now(),
      app_name: this.name,
      app_message: appMessage,
      log_info: JSON.stringify(info),
      ...metadata,
    };
  }

  info(payload: LogType): void {
    const log = this.__format(payload);
    logger.info('', log);
  }

  debug(payload: LogType): void {
    const log = this.__format(payload);
    logger.debug('', log);
  }

  error(payload: LogType): void {
    const log = this.__format(payload);
    logger.error('', log);
  }

  warning(payload: LogType): void {
    const log = this.__format(payload);
    logger.warn('', log);
  }
}
