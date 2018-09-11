import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import { EmailAddress } from 'app/graphql/scalars';

export default new GraphQLInputObjectType({
	name: 'CredentialsInput',
	description: "Credentials used to authenticate a user",
	fields: {
    email: {
			type: new GraphQLNonNull(EmailAddress)
		},
		password: {
			type: new GraphQLNonNull(GraphQLString)
		}
	}
});
