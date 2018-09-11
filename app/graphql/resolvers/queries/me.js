import { ViewerType } from 'app/graphql/types';
import ErrorQL from 'app/graphql/errors';

export default {
  type: ViewerType,
  permission: 'account',
  resolve: (root, args, ctx) => {
    return ViewerType;
  }
}
