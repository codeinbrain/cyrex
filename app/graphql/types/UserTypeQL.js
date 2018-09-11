import { GraphQLString, GraphQLList } from 'graphql';
import { GraphQLModelObjectType } from 'app/graphql/tools';
import { EmailAddress } from 'app/graphql/scalars';

export default new GraphQLModelObjectType({
	name: 'User',
	fields: {
		email: {
			type: EmailAddress
		},
		firstName: {
			type: GraphQLString
		},
		lastName: {
			type: GraphQLString
		},
		roles: {
			type: new GraphQLList(GraphQLString),
			resolve: (self, args, ctx) => {
				if (!ctx.viewer) return null;
				return ctx.viewer.hasRole('admin') ? self.roles : null;
			}
		}
	}
});
