import { Repository } from 'typeorm';
import { User } from '../user.entity';

export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<User>> = jest.fn(
  () => ({
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  }),
);
