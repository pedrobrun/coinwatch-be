import { NextFunction, Request, Response } from 'express';
import { authJwtToken, decodeJwtToken } from '../utils/jwt';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    throw Error('No auth token provided.');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    throw Error('No auth token denied.');
  }
  try {
    const verified = authJwtToken(token);
    if (!verified) {
      throw Error('Access denied.');
    }

    const authenticatedPayload = decodeJwtToken(token);

    if (authenticatedPayload) {
      req.body.username = (authenticatedPayload as any).username;
    }

    next();
  } catch (e: any) {
    res.status(404).send({ message: 'Access denied.' });
  }
}
