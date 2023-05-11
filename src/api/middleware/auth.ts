import { NextFunction, Request, Response } from 'express';
import { getConfigSync } from '../../utils/config';

const authorization = getConfigSync().api.authorization;

export default function auth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const header = request.headers['authorization'];

  if (!header) return response.sendStatus(401);
  else if (header === authorization) next();
  else return response.sendStatus(401);
}
