import { genSalt, hash } from 'bcrypt';

export async function hashPassword(password: string) {
  const salt = await genSalt(12);

  password = await hash(password, salt);

  return password;
}
