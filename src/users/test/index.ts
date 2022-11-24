import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { Movie } from '../../movies/movie.entity';

export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: jest.Mock<{}>;
};

export const userRepositoryMockFactory: () => MockType<Repository<User>> =
  jest.fn(() => ({
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  }));

export const movieRepositoryMockFactory: () => MockType<Repository<Movie>> =
  jest.fn(() => ({
    find: jest.fn().mockReturnValue([]),
    findOneBy: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  }));
