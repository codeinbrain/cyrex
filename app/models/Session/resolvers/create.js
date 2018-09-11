import jwt from 'jsonwebtoken';
import ErrorQL from 'app/graphql/errors';
import { JWTSecret } from 'app/config';

export default function(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const token = jwt.sign({
        data: { user: user.id }
      }, JWTSecret, {
        expiresIn: '1d'
      });

      const newSession = await (new this({
        user,
        token
      })).save();
      resolve(newSession);
    } catch (err) {
      reject(ErrorQL.internal());
    }
  });
}
