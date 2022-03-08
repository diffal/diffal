import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.TRANSIENT, //new class for each called,un singleton
})
export class LoggerService extends ConsoleLogger {
  log(message: any, ...optionalParams: any[]) {
    this.log(message, optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.error(message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.warn(message, optionalParams);
  }
}
