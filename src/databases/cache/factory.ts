import { env } from '@/config';
import { CacheRepository } from './repository';
import { RedisRepository } from './redis';
import { NoCacheRepository } from './noCache';

export enum CacheStrategy {
  REDIS,
  NO_CACHE,
}

export const getCacheRepository = (): CacheRepository => {
  const strategy: CacheStrategy = CacheStrategy[env.CACHE_IMPLEMENTATION];

  switch (strategy) {
    case CacheStrategy.REDIS:
      return new RedisRepository();
    case CacheStrategy.NO_CACHE:
      return new NoCacheRepository();
    default:
      throw new Error('Invalid cache implementation value');
  }
};
