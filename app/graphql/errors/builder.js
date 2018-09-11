import { createError } from 'apollo-errors';

export default (type, code, message, name) => {
  const e = createError(type, {
    message: message
  });

  return new e({
    data: {
      code: code,
      name: name
    }
  });
}
