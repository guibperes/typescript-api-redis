import { config } from 'dotenv';

config();

const envToString = (name: string, defaultValue = '') =>
  process.env[name] ?? defaultValue;

export const env = {
  HTTP_PORT: Number.parseInt(envToString('HTTP_PORT', '3000')),
  REDIS_HOST: envToString('REDIS_HOST'),
  REDIS_PORT: Number.parseInt(envToString('REDIS_PORT')),
  GITHUB_TOKEN: envToString('GITHUB_TOKEN'),
  CACHE_IMPLEMENTATION: envToString('CACHE_IMPLEMENTATION', 'NO_CACHE'),
  LOGGER_IMPLEMENTATION: envToString('LOGGER_IMPLEMENTATION'),
};
