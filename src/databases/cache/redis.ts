import Redis from 'ioredis';

import { env } from '@/config';
import { logger } from '@/libs';
import { CacheRepository } from './repository';

export class RedisRepository implements CacheRepository {
  private static instance: RedisRepository;

  private redis = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    db: 0,
    lazyConnect: true,
  });

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new RedisRepository();
    }

    return this.instance;
  }

  async connect(): Promise<void> {
    try {
      logger.info('Connecting on redis database');
      await this.redis.connect();
      logger.info('Redis database connected');
    } catch (error) {
      logger.info('Cannot connect on redis database');
      logger.error(error);

      process.exit(1);
    }
  }

  async disconnect(): Promise<void> {
    try {
      logger.info('Disconnecting on redis database');
      this.redis.disconnect();
      logger.info('Redis database disconnected');
    } catch (error) {
      logger.info('Cannot disconnect on redis database');
      logger.error(error);

      process.exit(1);
    }
  }

  async getJSON<T>(key: string): Promise<T | null> {
    logger.info('Getting cache from redis');
    const data = await this.redis.get(key);

    if (data) {
      logger.info('Cache index founded on redis');
      return JSON.parse(data);
    }

    logger.info('Cache index not founded on redis');
    return null;
  }

  async setJSON<T>(index: string, seconds: number, value: T): Promise<void> {
    const valueString = JSON.stringify(value);

    logger.info('Setting index data on redis');
    await this.redis.setex(index, seconds, valueString);
  }
}
