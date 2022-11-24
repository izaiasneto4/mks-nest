import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  const findOneSpy = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: findOneSpy,
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should work just fine', async () => {
      const user = {
        email: 'test@test.com',
        password: 'test',
      };

      findOneSpy.mockReturnValueOnce(user);

      expect(await service.login({ email: user.email })).toBeDefined();
    });

    it('should throw if user is not found', async () => {
      findOneSpy.mockReturnValueOnce(undefined);

      await expect(() =>
        service.login({ email: 'test@test.com' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('validate user', () => {
    it('should not validate if user dont exist', async () => {
      const user = {
        email: 'test@test.com',
        password: 'test',
      };

      expect(await service.validateUser(user.email, user.password)).toBeNull();
    });

    it('should work just fine', async () => {
      const user = {
        email: 'test@test.com',
        password: 'test',
      };

      findOneSpy.mockReturnValueOnce(user);

      expect(await service.validateUser(user.email, user.password)).toEqual({
        email: user.email,
      });
    });
  });
});
