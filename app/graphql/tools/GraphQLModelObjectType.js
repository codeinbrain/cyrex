import { GraphQLObjectType, GraphQLNonNull, GraphQLID } from 'graphql';
import { DateTime } from 'app/graphql/scalars';

export default class GraphQLModelObjectType extends GraphQLObjectType {
  constructor(config) {
    const objectFields = config.fields;
    config.fields = () => {
      return {
        ...((typeof objectFields == "function" ? objectFields() : objectFields) || {}),
        ...{
          id: { type: new GraphQLNonNull(GraphQLID) },
          createdAt: { type: new GraphQLNonNull(DateTime) },
          updatedAt: { type: new GraphQLNonNull(DateTime) }
        }
      }
    }

    super(config);
  }
}
