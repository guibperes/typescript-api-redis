import { getCacheRepository } from '@/databases';

import { GithubRepository } from './entity';
import * as repository from './repository';

const cacheRepository = getCacheRepository();

export const getRepositories = async (
  username: string,
): Promise<GithubRepository[]> => {
  const cachedData = await cacheRepository.getJSON<GithubRepository[]>(
    username,
  );

  if (cachedData) {
    return cachedData;
  }

  const data = await repository.getRepositories(username);

  await cacheRepository.setJSON(username, 60, data);
  return data;
};
