import ErrorQL from 'app/graphql/errors';
import bcrypt from 'bcrypt';

export default function({ email, password }) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await this.findOne({ email });
      if (!user) return resolve(null);

      const isPasswordOk = await bcrypt.compare(password, user.password);
      if (!isPasswordOk) return resolve(null);

      resolve(user);
    } catch (e) {
      reject(ErrorQL.internal());
    }
  });
}
