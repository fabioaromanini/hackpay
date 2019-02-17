const userService = require('../services/userService');

describe('User Service', () => {
  it('should create a 8 chars token', () => {
    const token = userService.createToken();
    expect(token).toHaveLength(8);
  });

  it("should validate user's document", () => {
    const invalidCpf = '00000000023';
    expect(userService.validateUserForSignup({ cpf: invalidCpf })).toBeFalsy();

    const validCpf = '04416547030';
    expect(userService.validateUserForSignup({ cpf: validCpf })).toBeTruthy();
  });
});
