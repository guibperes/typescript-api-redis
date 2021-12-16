import { Request, Response, NextFunction } from 'express';

import { HttpStatus } from '../libs';
import { ApiError } from './ApiError';

const sendError = (res: Response, error: ApiError) => {
  const { message } = error;
  const status = error.getStatus();

  return res.status(status.code).json({ error: { status, message } });
};

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
  throw new ApiError(HttpStatus.NOT_FOUND, 'Resource not provided');
};
