/* eslint-disable @typescript-eslint/no-unused-vars */

import { CacheRepository } from './repository';

export class NoCacheRepository implements CacheRepository {
  private static instance: NoCacheRepository;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new NoCacheRepository();
    }

    return this.instance;
  }

  async connect(): Promise<void> {}

  async disconnect(): Promise<void> {}

  async getJSON<T>(key: string): Promise<T | null> {
    return null;
  }

  async setJSON<T>(index: string, seconds: number, value: T): Promise<void> {}
}
