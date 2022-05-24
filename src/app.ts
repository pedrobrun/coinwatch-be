import express from 'express';
import dotenv from 'dotenv';
import userRouter from './domains/user/UserController';
import prismaClient from './db';
import coinRouter from './domains/coins/CoinController';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

async function main() {
  app.use(express.json());
  app.use(
    cors({
      origin: 'http://localhost:3001',
      credentials: true,
    })
  );

  app.get('/', (req, res) => {
    res.send('Welcome to Coinwatch API');
  });

  await prismaClient.$connect();

  prismaClient.$connect();

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  // routes
  app.use('/user', userRouter);
  app.use('/coin', coinRouter);
}

main();
