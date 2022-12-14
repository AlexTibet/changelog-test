import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

@Injectable()
export default class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        return {
          ok: true,
          result: value,
        };
      }),
    );
  }
}
