import { injectable, inject } from 'inversify';

import { CacheRepository } from '@/databases';
import { GithubRepositories } from './entity';
import { GithubRepository } from './repository';

@injectable()
export class GithubService {
  @inject(GithubRepository)
  private readonly githubRepository: GithubRepository;

  @inject('CacheRepository')
  private readonly cacheRepository: CacheRepository;

  async getRepositories(username: string): Promise<GithubRepositories[]> {
    const cachedData = await this.cacheRepository.getJSON<GithubRepositories[]>(
      username,
    );

    if (cachedData) {
      return cachedData;
    }

    const data = await this.githubRepository.getRepositories(username);

    await this.cacheRepository.setJSON(username, 60, data);
    return data;
  }
}
