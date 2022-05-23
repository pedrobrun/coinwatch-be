import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface UserPayload {
  username: string;
  encodedPassword: string;
}

export function generateJwtToken({ username, encodedPassword }: UserPayload) {
  return jwt.sign({ username, encodedPassword }, `${process.env.JWT_SECRET}`, {
    expiresIn: '1800s',
  });
}

export function authJwtToken(token: string) {
  return jwt.verify(token, `${process.env.JWT_SECRET}`);
}

export function decodeJwtToken(token: string) {
  return jwt.decode(token);
}
