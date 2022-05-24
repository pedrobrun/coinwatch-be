import express, { Request, Response } from 'express';
import prismaClient from '../../db';
import { authMiddleware } from '../../middlewares/jwtMiddleware';
import { userService } from '../user/UserController';
import { CoinRepository } from './CoinRepository';
import { CoinService } from './CoinService';

const coinRouter = express.Router();

const coinRepository = new CoinRepository({ prisma: prismaClient });
const coinService = new CoinService(coinRepository);

coinRouter.post('/', authMiddleware, async (req: Request, res: Response) => {
  const { coin, username } = req.body;

  if (!coin) res.send('No coin provided.');

  try {
    const addedCoin = await coinService.addToFavouriteCoins(coin, username);
    res.status(200).send({
      message: 'Coin was added to your favourites successfully!',
      coin: addedCoin,
    });
  } catch (e: any) {
    res.send(e.message);
  }
});

coinRouter.get(
  '/myCoins',
  authMiddleware,
  async (req: Request, res: Response) => {
    const { username } = req.body;

    if (!username) res.send('Not authenticated');

    try {
      const user = await userService.findByUsername(username);

      res.status(200).send({
        myCoins: user?.favouriteCoins,
      });
    } catch (e: any) {
      res.send(e.message);
    }
  }
);

export default coinRouter;
