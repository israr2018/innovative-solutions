import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class ResponseService{

  // success response
  makeSuccessResponse(res: Response, status: boolean, code: number, message: string, data: Record<any, any>): any {
    return res.status(code).send({status, code, message, data});
  }

  // error response
  makeErrorResponse(res: Response, status: boolean, code: number, message: string, data = []): any {
    return res.status(code).send({status, code, message, data});
  }

  // error response mobile
  makeErrorResMobile(res: Response, status: boolean, code: number, message: string, data: Record<any, any>): any {
    data = {};
    return res.status(code).send({status, code, message, data});
  }

  // response with multiple messages
  makeSuccessResponseMultiple(res: Response, status: boolean, code: number, message = [], data = []): any {
    return res.status(code).send({status, code, message, data});
  }

}
