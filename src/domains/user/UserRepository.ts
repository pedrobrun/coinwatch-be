import { hash, genSalt, compare } from 'bcrypt';
import { IUserRepository } from './IUserRepository';
import { User } from '@prisma/client';
import { Context } from '../../context';

export class UserRepository implements IUserRepository {
  context: Context;
  constructor(context: Context) {
    this.context = context;
  }

  public async findByUsername(username: string) {
    return this.context.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  public async registerUser(username: string, password: string) {
    const existing = await this.findByUsername(username);
    if (existing) throw Error('Username already in use.');

    const salt = await genSalt(12);

    password = await hash(password, salt);

    const created = await this.context.prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });

    return created;
  }

  public async authUser(user: User) {
    const existing = await this.findByUsername(user.username);

    if (!existing) throw Error("User doesn't exist");

    const checkPassword = await compare(user.password, existing.password);

    if (!checkPassword) throw 'Wrong password';
  }

  public async getAll() {
    return await this.context.prisma.user.findMany();
  }
}
