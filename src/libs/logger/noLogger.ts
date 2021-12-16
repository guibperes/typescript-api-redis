/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';

import { Logger } from './logger';

@injectable()
export class NoLogger implements Logger {
  info(message: string): void {}

  debug(message: string): void {}

  trace(message: string, data: object): void {}

  error(data: object): void {}

  getMiddleware(): any[] {
    return [(req: Request, res: Response, next: NextFunction) => next()];
  }
}
