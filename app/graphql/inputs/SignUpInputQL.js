import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import { EmailAddress, MongoID } from 'app/graphql/scalars';

export default new GraphQLInputObjectType({
	name: 'SignUpInput',
	description: "All data needed to sign up a new user",
	fields: {
    email: {
			type: new GraphQLNonNull(EmailAddress)
		},
		password: {
			type: new GraphQLNonNull(GraphQLString)
		},
		firstName: {
			type: new GraphQLNonNull(GraphQLString)
		},
		lastName: {
			type: new GraphQLNonNull(GraphQLString)
		}
	}
});
