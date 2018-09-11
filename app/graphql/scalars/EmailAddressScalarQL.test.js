import { GraphQLError } from 'graphql/error';
import Scalar from './EmailAddressScalarQL';

const correctEmail = 'test@test.com';
const failEmail = 'test@test';

test('Testing parseValue', () => {
  expect(() => Scalar.parseValue(0)).toThrow(TypeError);
  expect(() => Scalar.parseValue(true)).toThrow(TypeError);
  expect(() => Scalar.parseValue(failEmail)).toThrow(TypeError);
  expect(Scalar.parseValue(correctEmail)).toBe(correctEmail);
});

test('Testing serialize', () => {
  expect(() => Scalar.serialize(0)).toThrow(TypeError);
  expect(() => Scalar.serialize(true)).toThrow(TypeError);
  expect(() => Scalar.serialize(failEmail)).toThrow(TypeError);
  expect(Scalar.serialize(correctEmail)).toBe(correctEmail);
});
