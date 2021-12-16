import { injectable } from 'inversify';
import pino from 'pino';
import pinoHttp from 'pino-http';

import { Logger } from './logger';

@injectable()
export class PinoLogger implements Logger {
  private readonly pino = pino({
    redact: {
      remove: true,
      paths: [
        'hostname',
        'req.id',
        'req.headers',
        'req.remoteAddress',
        'req.remotePort',
        'res.headers',
      ],
    },
  });

  info(message: string): void {
    this.pino.info(message);
  }

  debug(message: string): void {
    this.pino.debug(message);
  }

  trace(message: string, data: object): void {
    this.pino.trace(message, data);
  }

  error(data: object): void {
    this.pino.error(data);
  }

  getMiddleware(): any[] {
    return [pinoHttp({ logger: this.pino })];
  }
}
