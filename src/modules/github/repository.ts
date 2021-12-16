import { injectable } from 'inversify';
import axios from 'axios';

import { env } from '@/config';
import { GithubRepositories } from './entity';

@injectable()
export class GithubRepository {
  async getRepositories(username: string): Promise<GithubRepositories[]> {
    const url = `https://api.github.com/users/${username}/repos`;
    const response = await axios.get<GithubRepositories[]>(url, {
      headers: { Authorization: `token ${env.GITHUB_TOKEN}` },
    });

    return response.data.map(({ id, name, full_name }) => ({
      id,
      name,
      full_name,
    }));
  }
}
