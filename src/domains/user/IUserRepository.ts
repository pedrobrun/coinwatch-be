export interface IUserRepository {
  getAll(): any;
  registerUser(username: string, password: string): any;
}
