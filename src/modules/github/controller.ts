import { controller, httpGet, requestParam } from 'inversify-express-utils';
import { inject } from 'inversify';

import { Logger } from '@/libs';
import { GithubService } from './service';

@controller('/github')
export class GithubController {
  @inject('Logger')
  private readonly logger: Logger;

  @inject(GithubService)
  private readonly githubService: GithubService;

  @httpGet('/:username/repos')
  async getRepositories(@requestParam('username') username: string) {
    this.logger.info('Starting GithubController.getRepositories');
    const response = await this.githubService.getRepositories(username);

    this.logger.info('Finished GithubController.getRepositories');
    return response;
  }
}
