import { User } from 'app/models';
import { UserType } from 'app/graphql/types';
import { SignUpInput } from 'app/graphql/inputs';

export default {
  type: UserType,
  args: {
    input: {
      type: SignUpInput
    }
  },
  resolve: async (root, { input }, ctx) => {
    const user = await User.create({ ...input });
    return user;
  }
}
