import ErrorQL from 'app/graphql/errors';

export default function(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const userCount = await this.countDocuments({ email: data.email });
      if (userCount) reject(ErrorQL.conflict("test", "email_exists"));

      const newUser = await (new this(data)).save();
      resolve(newUser);
    } catch (err) {
      reject(ErrorQL.internal());
    }
  });
}
