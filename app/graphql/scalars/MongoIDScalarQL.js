import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';
import isMongoId from 'validator/lib/isMongoId';

export default new GraphQLScalarType({
  name: 'MongoID',
  serialize(value) {
    if (typeof value !== 'string') {
      throw new TypeError(`Value is not string: ${value}`);
    }

    if (!isMongoId(value)) {
      throw new TypeError(`Value is not a valid id: ${value}`);
    }

    return value;
  },

  parseValue(value) {
    if (typeof value !== 'string') {
      throw new TypeError('Value is not string');
    }

    if (!isMongoId(value)) {
      throw new TypeError(`Value is not a valid id: ${value}`);
    }

    return value;
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as id but got a: ${ast.kind}`,
      );
    }

    if (!isMongoId(ast.value)) {
      throw new TypeError(`Value is not a valid id: ${ast.value}`);
    }

    return ast.value;
  },
});
