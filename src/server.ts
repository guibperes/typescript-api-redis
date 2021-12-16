import http from 'http';
import express from 'express';
import cors from 'cors';
import { InversifyExpressServer } from 'inversify-express-utils';

import { logger, loggerMiddleware } from './libs';
import { CacheRepository } from './databases';
import { notFoundMiddleware, errorMiddleware } from './errors';
import { env } from './config';
import { bootstrap } from './container';

import './modules';

const container = bootstrap();
const application = new InversifyExpressServer(container)
  .setConfig(app => {
    app.use(express.json());
    app.use(cors());
    app.use(loggerMiddleware);
  })
  .setErrorConfig(app => {
    app.use(notFoundMiddleware);
    app.use(errorMiddleware);
  })
  .build();

const server = http.createServer(application);
const cacheRepository = container.get<CacheRepository>('CacheRepository');

export const start = async () => {
  try {
    logger.info('Server startup process started');

    await cacheRepository.connect();

    server.listen(env.HTTP_PORT, () =>
      logger.info(`HTTP Server started on port ${env.HTTP_PORT}`),
    );

    logger.info('Server startup process finished');
  } catch (error) {
    logger.info('Server startup process failed');
    logger.error(error);

    process.exit(1);
  }
};

export const shutdown = async () => {
  try {
    logger.info('Server shutdown process started');

    await cacheRepository.disconnect();

    logger.info('Closing HTTP Server');
    server.close();
    logger.info('HTTP Server closed');

    logger.info('Server shutdown process finished');
    process.exit(0);
  } catch (error) {
    logger.info('Server shutdown process failed');
    logger.error(error);

    process.exit(1);
  }
};
