import axios from 'axios';

import { env } from '@/config';
import { GithubRepository } from './entity';

export const getRepositories = async (
  username: string,
): Promise<GithubRepository[]> => {
  const url = `https://api.github.com/users/${username}/repos`;
  const response = await axios.get<GithubRepository[]>(url, {
    headers: { Authorization: `token ${env.GITHUB_TOKEN}` },
  });

  return response.data.map(({ id, name, full_name }) => ({
    id,
    name,
    full_name,
  }));
};
