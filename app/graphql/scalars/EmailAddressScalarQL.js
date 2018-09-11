import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';
import isEmail from 'validator/lib/isEmail';

export default new GraphQLScalarType({
  name: 'EmailAddress',
  serialize(value) {
    if (typeof value !== 'string') {
      throw new TypeError(`Value is not string: ${value}`);
    }

    if (!isEmail(value)) {
      throw new TypeError(`Value is not a valid email address: ${value}`);
    }

    return value;
  },

  parseValue(value) {
    if (typeof value !== 'string') {
      throw new TypeError('Value is not string');
    }

    if (!isEmail(value)) {
      throw new TypeError(`Value is not a valid email address: ${value}`);
    }

    return value;
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as email addresses but got a: ${ast.kind}`,
      );
    }

    if (!isEmail(ast.value)) {
      throw new TypeError(`Value is not a valid email address: ${ast.value}`);
    }

    return ast.value;
  },
});
