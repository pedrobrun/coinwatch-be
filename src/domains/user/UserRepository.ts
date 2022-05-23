import { compare } from 'bcrypt';
import { IUserRepository } from './IUserRepository';
import { User } from '@prisma/client';
import { Context } from '../../context';

interface UserPayload {
  username: string;
  password: string;
}

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
    const created = await this.context.prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });

    return created;
  }

  public async authUser(userToAuth: UserPayload, userFound: User) {
    return compare(userToAuth.password, userFound.password);
  }

  public async getAll() {
    return await this.context.prisma.user.findMany();
  }
}
