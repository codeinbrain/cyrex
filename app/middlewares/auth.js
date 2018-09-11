import { Session } from 'app/models';

export default async (req, res, next) => {
  // Assign null value to viewer to avoid model resolvers error
  req.viewer = null;

  const { authorization } = req.headers;

  if (!authorization) return next();

  const tokenRegex = /^bearer\s([a-z0-9_\.\-]+)$/i;
  const match = tokenRegex.exec(authorization);

  if (!match) return next();
  const token = match[1];

  try {
    const session = await Session.getByToken(token);
    if (!session) return next();

    req.viewer = session.user;
  } catch (err) {
    next(err);
  }

  next();
}
