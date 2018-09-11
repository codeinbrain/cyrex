import { GraphQLID, GraphQLString } from 'graphql';
import { GraphQLModelObjectType } from 'app/graphql/tools';
import UserType from './UserTypeQL';

export default new GraphQLModelObjectType({
	name: 'Session',
	fields: {
		token: {
			type: GraphQLString
		},
		user: {
			type: UserType
		}
	}
});
