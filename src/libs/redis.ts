import Redis from 'ioredis';

import { logger } from './logger';

const redis = new Redis({
  host: 'localhost',
  port: 6379,
  db: 0,
  lazyConnect: true,
});

export const connect = async () => {
  try {
    logger.info('Connecting on redis database');
    await redis.connect();
    logger.info('Redis database connected');
  } catch (error) {
    logger.info('Cannot connect on redis database');
    logger.error(error);

    process.exit(1);
  }
};

export const disconnect = async () => {
  try {
    logger.info('Disconnecting on redis database');
    redis.disconnect();
    logger.info('Redis database disconnected');
  } catch (error) {
    logger.info('Cannot disconnect on redis database');
    logger.error(error);

    process.exit(1);
  }
};

export const getJSON = async <T>(key: string): Promise<T | null> => {
  logger.info('Getting cache from redis');
  const data = await redis.get(key);

  if (data) {
    logger.info('Cache index founded on redis');
    return JSON.parse(data);
  }

  logger.info('Cache index not founded on redis');
  return null;
};

export const setJSON = async <T>(
  index: string,
  seconds: number,
  value: T,
): Promise<void> => {
  const valueString = JSON.stringify(value);

  logger.info('Setting index data on redis');
  await redis.setex(index, seconds, valueString);
};
