import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { BaseRpcResponse } from 'src/types';
import { HttpStatus } from '@nestjs/common';

const getResponse = (rpcRes: BaseRpcResponse) =>
  rpcRes.status === HttpStatus.CREATED ? {} : rpcRes;

@Injectable()
export class RpcResponseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((rpcRes: BaseRpcResponse) => {
        if (!rpcRes.error) return getResponse(rpcRes);

        throw new HttpException(
          {
            message: rpcRes.error,
          },
          rpcRes.status,
        );
      }),
    );
  }
}
