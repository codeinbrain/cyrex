import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';
import validator from 'validator';

export default new GraphQLScalarType({
  name: 'PositiveInt',
  parseValue(value) {
    return validator.isInt(value) ? value : null;
  },
  serialize(value) {
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw GraphQLError('Value must be an integer');
    }

    const value = parseInt(ast.value);
    if (isNaN(value) || value < 0) {
      throw TypeError('Value must be a positive integer');
    }

    return value;
  }
});
