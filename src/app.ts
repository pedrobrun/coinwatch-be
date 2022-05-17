import express from 'express';
import dotenv from 'dotenv';
import userRouter from './domains/user/UserController';
import { prismaClient } from './db';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

async function main() {
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Coinwatch - base url');
  });

  await prismaClient.$connect();

  prismaClient.$connect();

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  // routes
  app.use('/user', userRouter);
}

main();
