import { describe, it, expect } from '@jest/globals';

const user = {
  name: 'Steve',
  email: 'test@steve.com',
  password: '123456'
};

describe('Register a new accont', () => {
  it('Register', async () => {
    expect(user.name).toBe('Steve');
  });
});