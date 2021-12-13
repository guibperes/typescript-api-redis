import { config } from 'dotenv';

config();

const envToString = (name: string, defaultValue = '') =>
  process.env[name] ?? defaultValue;

export const env = {
  HTTP_PORT: envToString('HTTP_PORT', '3000'),
};
