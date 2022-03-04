import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LogRequestService } from 'src/log-request/log-request.service';

@Injectable()
export class LogRequestInterceptor implements NestInterceptor {
  constructor(private readonly logRequestService: LogRequestService) { }
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    await this.logRequestService.insertLog(
      request.method,
      request.originalUrl)
    return next.handle()
  }
}
