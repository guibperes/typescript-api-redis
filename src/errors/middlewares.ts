import { Request, Response, NextFunction } from 'express';

import { HttpStatus } from '../libs';
import { ApiError } from './ApiError';

const sendError = (res: Response, error: ApiError) =>
  res.status(error.getStatus().status).json({ error });

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) =>
  error instanceof ApiError
    ? sendError(res, error)
    : sendError(res, ApiError.from(error));

export const notFoundMiddleware = () => {
  throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
};
