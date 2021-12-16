import { Container } from 'inversify';

import { Logger, getLogger } from '@/libs';
import { CacheRepository, getCacheRepository } from './databases';
import { GithubRepository, GithubService } from './modules';

const container = new Container({ defaultScope: 'Singleton' });

container.bind(GithubRepository).toSelf();
container.bind(GithubService).toSelf();
container.bind<Logger>('Logger').toDynamicValue(getLogger);
container
  .bind<CacheRepository>('CacheRepository')
  .toDynamicValue(getCacheRepository);

export const getContainer = (): Container => container;
