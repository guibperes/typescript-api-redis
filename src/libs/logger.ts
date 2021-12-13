import pino from 'pino';
import pinoHttp from 'pino-http';

export const logger = pino({
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

export const loggerMiddleware = pinoHttp({ logger });
