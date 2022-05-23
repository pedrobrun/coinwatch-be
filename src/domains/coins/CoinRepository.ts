import { User } from '@prisma/client';
import { Context } from '../../context';
import { ICoinRepository } from './ICoinRepository';

export class CoinRepository implements ICoinRepository {
  context: Context;
  constructor(context: Context) {
    this.context = context;
  }

  public async addToFavouriteCoins(coin: any, user: User) {
    const exists = user.favouriteCoins.find((c) => (c as any).id === coin.id);
    if (exists) {
      throw Error('Already favourite.');
    }

    user.favouriteCoins.push(coin);

    // TODO: check for already added coin

    return this.context.prisma.user.update({
      where: {
        username: user.username,
      },
      data: {
        favouriteCoins: user.favouriteCoins,
      },
    });
  }
}
