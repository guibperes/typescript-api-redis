import 'express-async-errors';

import './config/alias';
import { start, shutdown } from './server';

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

start();
