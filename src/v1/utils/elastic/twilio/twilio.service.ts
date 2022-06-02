import * as twilio from 'twilio';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { LoggerHelper } from '../../../../core/helpers/LoggerHelper';
// import { SmsDto } from '@/v1/utils/twilio/dto/sms.dto';

const FILE_NAME = 'twilio.service.ts';

@Injectable()
export class TwilioService {
  TWILIO_SID: string;
  TWILIO_AUTH_TOKEN: string;
  client: any;

  constructor(
    private configService: ConfigService,
    private logger: LoggerHelper,
  ) {
    this.TWILIO_SID = this.configService.get<string>('TWILIO.ACCOUNT_SID');
    this.TWILIO_AUTH_TOKEN = this.configService.get<string>(
      'TWILIO.ACCOUNT_AUTH_TOKEN',
    );

    this.client = twilio(this.TWILIO_SID, this.TWILIO_AUTH_TOKEN);
  }

  async sendOtp(params: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        this.logger.debug({
          app_message: 'TWILIO_SEND_OTP_START',
          log_info: {
            fileName: FILE_NAME,
            params,
          },
          metadata: { mobile: params.to },
        });
        const sendOTP = await this.client.messages.create(params);
        this.logger.info({
          app_message: 'TWILIO_SEND_OTP_SUCCESS',
          log_info: {
            fileName: FILE_NAME,
            params,
          },
          metadata: { mobile: params.to },
        });

        return resolve(sendOTP);
      } catch (err) {
        this.logger.error({
          app_message: 'TWILIO_SEND_OTP_ERROR',
          log_info: {
            fileName: FILE_NAME,
            params,
          },
          metadata: { errorMessage: err.message, mobile: params.to },
        });
        return reject(err);
      }
    });
  }
}
