import ErrorQL from 'app/graphql/errors';
import jwt from 'jsonwebtoken';
import { JWTSecret } from 'app/config';

export default function(token) {
  return new Promise(async (resolve, reject) => {
    try {
      const decoded = jwt.verify(token, JWTSecret);
      const session = await this.findOne({ token });
      if (!session) throw ErrorQL.unauthorized();
      resolve(session);
    } catch(err) {
      resolve(null);
    }
  });
}
