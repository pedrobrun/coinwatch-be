import { userService } from '../user/UserController';
import { CoinRepository } from './CoinRepository';

export class CoinService {
  coinRepository: CoinRepository;
  constructor(coinRepository: CoinRepository) {
    this.coinRepository = coinRepository;
  }

  public async addToFavouriteCoins(coin: any, username: string) {
    const foundUser = await userService.findByUsername(username);

    if (!foundUser) throw Error("Username doesn't exist.");

    return this.coinRepository.addToFavouriteCoins(coin, foundUser);
  }
}
