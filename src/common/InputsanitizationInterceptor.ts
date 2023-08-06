import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as xss from 'xss-clean';
import * as escape from 'escape-html';

@Injectable()
export class InputDataSanitizationInteceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log(' sanitizing input');
    if (request.body) {
      for (let key in request.body) {
        if (typeof request.body[key] === 'string') {
          //This removes a field that has a security vulnerablity
          //   request.body[key] = xss(request.body[key]);
          // This escpaes the probelmatic data
          request.body[key] = escape(request.body[key]);
        }
      }
    }
    return next.handle();
  }
}
