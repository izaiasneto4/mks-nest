import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MockType, repositoryMockFactory } from './fixtures';

describe('UsersService', () => {
  let service: UsersService;
  let repositoryMock: MockType<Repository<User>>;

  const mockBcrypt = {
    genSalt: jest.fn(),
    hash: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
        {
          provide: 'Bcrypt',
          useValue: mockBcrypt,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repositoryMock = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repositoryMock).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const email = 'test@test.com';
      const password = 'test';

      const user: User = new User();

      user.email = email;
      user.password = password;

      repositoryMock.findOneBy.mockReturnValueOnce(user);

      expect(await service.findOne({ email: user.email })).toEqual(user);
    });

    it('should throw if user does not exist', () => {
      const email = 'nothing@test.com';

      jest.spyOn(repositoryMock, 'findOneBy').mockReturnValue(undefined);

      expect(service.findOne({ email })).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const email = 'test2@test.com';
      const password = 'test2@test.com';

      const user: User = new User();

      user.email = email;
      user.password = password;

      jest.spyOn(repositoryMock, 'find').mockReturnValue([user]);

      const result = await service.findAll();

      expect(result).toEqual([user]);
      expect(result[0]).toEqual(user);
    });

    it('should return empty array if no users are found', async () => {
      jest.spyOn(repositoryMock, 'find').mockReturnValue([]);

      expect(await service.findAll()).toEqual([]);
    });
  });

  describe('createUser', () => {
    it('should create user', async () => {
      const email = 'email';
      const password = 'password';

      jest.spyOn(repositoryMock, 'create').mockReturnValue({});

      const hashSpy = jest.spyOn(mockBcrypt, 'hash');
      hashSpy.mockResolvedValue('hashedPassword');

      const saltSpy = jest.spyOn(mockBcrypt, 'genSalt');
      saltSpy.mockResolvedValue('salt');

      const result = await service.createUser({
        email,
        password,
        passwordConfirmation: password,
      });

      expect(result).toEqual({ email });
    });

    it('should throw if user already exists', async () => {
      repositoryMock.save = jest
        .fn()
        .mockRejectedValue(() => Promise.reject(InternalServerErrorException));

      jest.spyOn(repositoryMock, 'create').mockReturnValue({});

      const hashSpy = jest.spyOn(mockBcrypt, 'hash');
      hashSpy.mockResolvedValue('hashedPassword');

      const saltSpy = jest.spyOn(mockBcrypt, 'genSalt');
      saltSpy.mockResolvedValue('salt');

      expect(
        service.createUser({
          email: 'email',
          password: 'password',
          passwordConfirmation: 'password',
        }),
      ).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw if password confirmation does not match password', async () => {
      expect(
        service.createUser({
          email: 'email',
          password: 'password',
          passwordConfirmation: 'wrongPassword',
        }),
      ).rejects.toThrow(Error('Password confirmation does not match password'));
    });
  });
});
