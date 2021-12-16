import { injectable } from 'inversify';
import Redis from 'ioredis';

import { env } from '@/config';
import { Logger } from '@/libs';
import { getContainer } from '@/container';
import { CacheRepository } from './repository';

@injectable()
export class RedisRepository implements CacheRepository {
  private readonly logger = getContainer().get<Logger>('Logger');

  private readonly redis = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    db: 0,
    lazyConnect: true,
  });

  async connect(): Promise<void> {
    try {
      this.logger.info('Connecting on redis database');
      await this.redis.connect();
      this.logger.info('Redis database connected');
    } catch (error) {
      this.logger.info('Cannot connect on redis database');
      this.logger.error(error);

      process.exit(1);
    }
  }

  async disconnect(): Promise<void> {
    try {
      this.logger.info('Disconnecting on redis database');
      this.redis.disconnect();
      this.logger.info('Redis database disconnected');
    } catch (error) {
      this.logger.info('Cannot disconnect on redis database');
      this.logger.error(error);

      process.exit(1);
    }
  }

  async getJSON<T>(key: string): Promise<T | null> {
    this.logger.debug('Getting cache from redis');
    this.logger.trace('Index key value', { key });
    const data = await this.redis.get(key);

    if (data) {
      this.logger.debug('Cache index founded on redis');
      this.logger.trace('Index value data', { data });
      return JSON.parse(data);
    }

    this.logger.debug('Cache index not founded on redis');
    return null;
  }

  async setJSON<T>(index: string, seconds: number, value: T): Promise<void> {
    const valueString = JSON.stringify(value);

    this.logger.debug('Setting index data on redis');
    this.logger.trace('Index value and data value', { index, value });
    await this.redis.setex(index, seconds, valueString);
  }
}
