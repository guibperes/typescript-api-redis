import { inject, injectable } from 'inversify';
import axios from 'axios';

import { env } from '@/config';
import { Logger } from '@/libs';
import { GithubRepositories } from './entity';

@injectable()
export class GithubRepository {
  @inject('Logger')
  private readonly logger: Logger;

  async getRepositories(username: string): Promise<GithubRepositories[]> {
    this.logger.debug('Starting GithubRepository.getRepositories');
    this.logger.trace('Calling Github API with data', { username });

    const url = `https://api.github.com/users/${username}/repos`;
    const response = await axios.get<GithubRepositories[]>(url, {
      headers: { Authorization: `token ${env.GITHUB_TOKEN}` },
    });

    this.logger.trace('Data found on Github API', response.data);
    this.logger.debug('Mapping data to GithubRepositories entity');
    const repositories = response.data.map(({ id, name, full_name }) => ({
      id,
      name,
      full_name,
    }));

    this.logger.trace('Data mapped to GithubRepositories entity', repositories);
    this.logger.debug('Finished GithubRepository.getRepositories');
    return repositories;
  }
}
