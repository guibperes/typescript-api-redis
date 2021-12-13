import { Router } from 'express';

import { githubController } from './modules';

const router = Router();

router.use('/github', githubController);
router.get('/healthcheck', (req, res) => res.status(200).end());

export { router };
