import { redis, logger } from '@/libs';

import { GithubRepository } from './entity';
import * as repository from './repository';

export const getRepositories = async (
  username: string,
): Promise<GithubRepository[]> => {
  logger.info('Getting cache from redis');
  const cachedData = await redis.get(username);

  if (cachedData) {
    logger.info('Cache index founded on redis');
    return JSON.parse(cachedData);
  }

  logger.info('Cache index not founded on redis, calling Github API');
  const data = await repository.getRepositories(username);

  logger.info('Setting index data on redis');
  await redis.setex(username, 60, JSON.stringify(data));
  return data;
};
