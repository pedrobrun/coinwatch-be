import { Context, createMockContext, MockContext } from '../src/context';
import { UserRepository } from '../src/domains/user/UserRepository';
import { UserService } from '../src/domains/user/UserService';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

describe('insert', () => {
  it('Should register an unexisting username', async () => {
    const userRepository = new UserRepository(mockCtx);
    const userService = new UserService(userRepository);

    const mockUser = {
      id: 'some-user-id',
      username: 'John_Doe',
      password: 'mypassword',
      favouriteCoins: [],
    };

    mockCtx.prisma.user.create.mockResolvedValue(mockUser);

    await expect(
      userService.registerUser(mockUser.username, mockUser.password)
    ).resolves.toEqual({
      id: 'some-user-id',
      username: 'John_Doe',
      password: 'mypassword',
      favouriteCoins: [],
    });
  });
});
