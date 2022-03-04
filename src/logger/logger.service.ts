import { Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.TRANSIENT, //new class for each called,un singleton
})
export class LoggerService implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log(message, optionalParams);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {}
}
