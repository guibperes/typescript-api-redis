import { env } from '@/config';
import { Logger } from './logger';
import { PinoLogger } from './pino';
import { NoLogger } from './noLogger';

export enum LoggerStrategy {
  PINO,
  NO_LOGGER,
}

export const getLogger = (): Logger => {
  const strategy: LoggerStrategy = LoggerStrategy[env.LOGGER_IMPLEMENTATION];

  switch (strategy) {
    case LoggerStrategy.PINO:
      return new PinoLogger();
    case LoggerStrategy.NO_LOGGER:
      return new NoLogger();
    default:
      throw new Error('Invalid Logger Implementation');
  }
};
