import { UserRepository } from './UserRepository';

export class UserService {
  userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async getAll() {
    return this.userRepository.getAll();
  }

  public async registerUser(username: string, password: string) {
    return this.userRepository.registerUser(username, password);
  }
}
