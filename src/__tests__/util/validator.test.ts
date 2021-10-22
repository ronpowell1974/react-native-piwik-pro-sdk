import { validateInt } from '../../util/validator';

describe('#validateInt', () => {
  test('should not throw any exception when called with an integer', () => {
    expect(() => validateInt(1)).not.toThrow();
  });

  test('should throw an error when called with a float', () => {
    expect(() => validateInt(1.1)).toThrow(
      new Error('Parameter must be an integer number')
    );
  });
});
