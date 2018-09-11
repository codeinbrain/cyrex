import ErrorQL from 'app/graphql/errors';
import { User, Session } from 'app/models';
import { SessionType } from 'app/graphql/types';
import { CredentialsInput } from 'app/graphql/inputs';

export default {
  type: SessionType,
  args: {
    credentials: {
      type: CredentialsInput,
      description: "Credentials used to signin user"
    }
  },
  resolve: (root, args, ctx) => {
    const user = await User.getByCredentials(args.credentials);
    if (!user) throw ErrorQL.unauthorized();

    const session = await Session.create(user);
    return session;
  }
}
