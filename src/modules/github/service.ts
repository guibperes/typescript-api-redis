import { redis } from '@/libs';

import { GithubRepository } from './entity';
import * as repository from './repository';

export const getRepositories = async (
  username: string,
): Promise<GithubRepository[]> => {
  const cachedData = await redis.getJSON<GithubRepository[]>(username);

  if (cachedData) {
    return cachedData;
  }

  const data = await repository.getRepositories(username);

  await redis.setJSON(username, 60, data);
  return data;
};
