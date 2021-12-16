import { injectable } from 'inversify';
import pino from 'pino';
import pinoHttp from 'pino-http';

import { env } from '@/config';
import { Logger } from './logger';

enum LoggerLevel {
  error = 10,
  trace = 20,
  debug = 30,
  info = 40,
}

@injectable()
export class PinoLogger implements Logger {
  private readonly pino = pino({
    level: env.LOGGER_LEVEL,
    levelVal: LoggerLevel[env.LOGGER_LEVEL],
    useOnlyCustomLevels: true,
    customLevels: {
      error: 10,
      trace: 20,
      debug: 30,
      info: 40,
    },
    formatters: { level: label => ({ level: label }) },
    redact: {
      remove: true,
      paths: [
        'pid',
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
