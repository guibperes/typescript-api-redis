import { Container } from 'inversify';

import { logger } from '@/libs';
import { CacheRepository, getCacheRepository } from './databases';
import { GithubRepository, GithubService } from './modules';

export const bootstrap = (): Container => {
  logger.info('Bootstraping application to container');
  const container = new Container({ defaultScope: 'Singleton' });

  container.bind(GithubRepository).toSelf();
  container.bind(GithubService).toSelf();
  container
    .bind<CacheRepository>('CacheRepository')
    .toDynamicValue(getCacheRepository);

  logger.info('Bootstraping application to container finished');
  return container;
};
