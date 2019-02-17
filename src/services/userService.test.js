const userService = require('../services/userService');

describe('User Service', () => {
  it('should create a 8 chars token', () => {
    const token = userService.createToken();
    expect(token).toHaveLength(8);
  });
});
