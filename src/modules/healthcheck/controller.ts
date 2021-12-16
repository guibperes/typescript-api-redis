import { Response } from 'express';
import { controller, httpGet, response } from 'inversify-express-utils';

import { HttpStatus } from '@/libs';

@controller('/healthcheck')
export class HealthcheckController {
  @httpGet('/')
  async healthcheck(@response() res: Response) {
    return res.status(HttpStatus.OK).end();
  }
}
