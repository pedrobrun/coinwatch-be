import { hashPassword } from '../../utils/hash';
import { generateJwtToken } from '../../utils/jwt';
import { UserRepository } from './UserRepository';

export class UserService {
  userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async getAll() {
    return this.userRepository.getAll();
  }

  public async findByUsername(username: string) {
    return this.userRepository.findByUsername(username);
  }

  public async registerUser(username: string, password: string) {
    const existing = await this.findByUsername(username);
    if (existing) throw Error('Username already in use.');

    password = await hashPassword(password);

    return this.userRepository.registerUser(username, password);
  }

  public async authUser(username: string, password: string) {
    const existing = await this.findByUsername(username);

    if (!existing) throw Error("User doesn't exist");

    const isMatch = await this.userRepository.authUser(
      {
        username,
        password,
      },
      existing
    );

    if (!isMatch) throw Error("Password doesn't match");

    password = await hashPassword(password);

    return generateJwtToken({ username, encodedPassword: password });
  }
}
