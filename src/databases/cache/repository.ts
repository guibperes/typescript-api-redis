export interface CacheRepository {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getJSON<T>(key: string): Promise<T | null>;
  setJSON<T>(index: string, seconds: number, value: T): Promise<void>;
}
