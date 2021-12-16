import { Container } from 'inversify';

import { logger } from '@/libs';
import { CacheRepository, RedisRepository } from './databases';
import { GithubRepository, GithubService } from './modules';

export const bootstrap = (): Container => {
  logger.info('Bootstraping application to container');
  const container = new Container();

  container.bind(GithubRepository).toSelf().inSingletonScope();
  container.bind(GithubService).toSelf().inSingletonScope();
  container.bind<CacheRepository>('CacheRepository').to(RedisRepository);

  logger.info('Bootstraping application to container finished');
  return container;
};
