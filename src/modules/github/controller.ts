import { controller, httpGet, requestParam } from 'inversify-express-utils';
import { inject } from 'inversify';

import { GithubService } from './service';

@controller('/github')
export class GithubController {
  @inject(GithubService)
  private readonly githubService: GithubService;

  @httpGet('/:username/repos')
  async getRepositories(@requestParam('username') username: string) {
    const response = await this.githubService.getRepositories(username);

    return response;
  }
}
