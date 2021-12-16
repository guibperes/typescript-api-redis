import { injectable, inject } from 'inversify';

import { Logger } from '@/libs';
import { CacheRepository } from '@/databases';
import { GithubRepositories } from './entity';
import { GithubRepository } from './repository';

@injectable()
export class GithubService {
  @inject('Logger')
  private readonly logger: Logger;

  @inject(GithubRepository)
  private readonly githubRepository: GithubRepository;

  @inject('CacheRepository')
  private readonly cacheRepository: CacheRepository;

  async getRepositories(username: string): Promise<GithubRepositories[]> {
    this.logger.debug('Starting GithubService.getRepositories');
    this.logger.trace('Calling redis index with data', { username });
    const cachedData = await this.cacheRepository.getJSON<GithubRepositories[]>(
      username,
    );

    if (cachedData) {
      return cachedData;
    }

    const data = await this.githubRepository.getRepositories(username);
    await this.cacheRepository.setJSON(username, 60, data);

    this.logger.debug('Finished GithubService.getRepositories');
    return data;
  }
}
