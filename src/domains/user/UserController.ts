import express, { Request, Response } from 'express';
import prismaClient from '../../db';
import { UserRepository } from './UserRepository';
import { UserService } from './UserService';

const userRouter = express.Router();

const userRepository = new UserRepository({ prisma: prismaClient });

const userService = new UserService(userRepository);

userRouter.get('/', async (req: Request, res: Response) => {
  const users = await userService.getAll();
  return res.send(users);
});

userRouter.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(404).send('No username provided');
  }

  if (!password) {
    return res.status(404).send('No password provided');
  }

  if (username.length < 5) {
    return res.status(404).send("Username can't have less than 5 characters");
  }
  if (password.length < 5) {
    return res.status(404).send("Password can't have less than 5 characters");
  }

  try {
    const user = await userService.registerUser(username, password);
    console.log(user);
    if (!user) {
      return res.status(500).send('Something went wrong');
    }

    return res.status(200).send('User created.');
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
});

export default userRouter;
