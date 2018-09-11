import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { queries, mutations } from 'app/graphql/resolvers';

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: queries
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutations
  })
});
