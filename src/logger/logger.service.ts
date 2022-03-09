import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.TRANSIENT, //new class for each called,un singleton
})
export class LoggerService extends ConsoleLogger {}
