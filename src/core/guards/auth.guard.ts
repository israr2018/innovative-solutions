// import {
//     Injectable,
//     CanActivate,
//     ExecutionContext,
//     Inject,
//   } from '@nestjs/common';
//   import { constant } from '@/config/constant';
//   import * as jwt from 'jsonwebtoken';
//   import { ConfigService } from '@nestjs/config';
//   import { LoggerHelper } from '@/core/helpers';
  
//   const FILE_NAME = 'auth.guard.ts';
  
//   @Injectable()
//   export class AuthGuard implements CanActivate {
//     secret: string;
  
//     constructor(
//       @Inject('RedisCacheManager') private cacheManager,
//       private configService: ConfigService,
//       private logger: LoggerHelper,
//     ) {
//       this.secret = this.configService.get<string>('JWT.SECRET');
//     }
  
//     async canActivate(context: ExecutionContext): Promise<boolean> {
//       const request = context.switchToHttp().getRequest();
//       const response = context.switchToHttp().getResponse();
//       const token = request.headers.authorization;
//       const statusCode = 401;
  
//       this.logger.debug({
//         app_message: 'VALIDATE_TOKEN',
//         log_info: {
//           fileName: FILE_NAME,
//         },
//         metadata: {},
//       });
  
//       if (!token || token == '') {
//         return response.status(statusCode).send({
//           status: statusCode,
//           message: constant.INVALID_TOKEN,
//           error: constant.UNAUTHORIZED_USER,
//         });
//       }
  
//       try {
//         const tkn = token.split(' ');
//         const tokenWithoutBearer = tkn.length > 1 ? tkn[1] : tkn[0];
//         const verify = jwt.verify(tokenWithoutBearer, this.secret);
  
//         const userId = verify['data']
//           ? verify['data']._id
//             ? verify['data']._id
//             : ''
//           : '';
//         const userType = verify['data']
//           ? verify['data'].userType
//             ? verify['data'].userType
//             : ''
//           : '';
  
//           // check if token is expired
//         if (userId && userId != '' && userType && userType != '') {
//           const authToken = await this.cacheManager.get(userId + "connect-app-user-login");
          
//           if (authToken !== tokenWithoutBearer) {
//             return response.status(statusCode).send({
//               status: statusCode,
//               message: constant.SESSION_EXPIRED_MESSAGE,
//               error: constant.SESSION_EXPIRED_MESSAGE,
//             });
//           }
//         }
  
//         // add user info in request
//         request['auth'] = verify['data'];
//         // add token info in request
//         request['token'] = tokenWithoutBearer;
//       } catch (err) {
//         this.logger.warning({
//           app_message: 'TOKEN_VALIDATION_ERROR',
//           log_info: {
//             fileName: FILE_NAME,
//             errorMessage: err.message,
//             errorStack: err.stack,
//           },
//           metadata: { errorMessage: err.message },
//         });
//         return response.status(statusCode).send({
//           status: statusCode,
//           message: constant.SESSION_EXPIRED_MESSAGE,
//           error: constant.SESSION_EXPIRED_MESSAGE,
//         });
//       }
  
//       return true;
//     }
//   }
  