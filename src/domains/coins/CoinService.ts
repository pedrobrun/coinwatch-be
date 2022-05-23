import { userService } from '../user/UserController';
import { CoinRepository } from './CoinRepository';

export class CoinService {
  coinRepository: CoinRepository;
  constructor(coinRepository: CoinRepository) {
    this.coinRepository = coinRepository;
  }

  public async addToFavouriteCoins(coin: any, username: string) {
    const found = await userService.findByUsername(username);

    if (!found) throw Error("Username doesn't exist.");

    this.coinRepository.addToFavouriteCoins(coin, found);
  }
}
