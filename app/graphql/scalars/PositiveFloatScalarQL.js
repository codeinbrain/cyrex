import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';
import validator from 'validator';

export default new GraphQLScalarType({
  name: 'PositiveFloat',
  parseValue(value) {
    return validator.isFloat(value) ? value : null;
  },
  serialize(value) {
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.INT && ast.kind !== Kind.FLOAT) {
      throw new GraphQLError('Value must be a float');
    }

    const value = parseFloat(ast.value);
    if (isNaN(value) || value < 0) {
      throw new TypeError('Value must be a positive float');
    }

    return value;
  }
});
