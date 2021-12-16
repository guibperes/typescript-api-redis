/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable } from 'inversify';

import { CacheRepository } from './repository';

@injectable()
export class NoCacheRepository implements CacheRepository {
  async connect(): Promise<void> {}

  async disconnect(): Promise<void> {}

  async getJSON<T>(key: string): Promise<T | null> {
    return null;
  }

  async setJSON<T>(index: string, seconds: number, value: T): Promise<void> {}
}
