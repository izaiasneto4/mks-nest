import { User } from '../user.entity';

export const userStub = (): User => {
  return {
    id: '1',
    email: 'test@test.com',
    password: 'test',
    salt: 'test',
    confirmationToken: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
