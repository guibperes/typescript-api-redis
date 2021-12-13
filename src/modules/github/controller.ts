import { Router } from 'express';

import * as service from './service';

const githubController = Router();

githubController.get('/:username/repos', async (req, res) => {
  const { username } = req.params;
  const response = await service.getRepositories(username);

  return res.json(response);
});

export { githubController };
