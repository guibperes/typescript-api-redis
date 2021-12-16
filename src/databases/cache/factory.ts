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

  if (strategy === CacheStrategy.REDIS) return new RedisRepository();

  return new NoCacheRepository();
};
