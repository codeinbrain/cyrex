import errorBuilder from './builder';

export default {
  badRequest:   (message, name) => {
    return errorBuilder('BadRequest', 400, message, name || 'bad_request');
  },
  unauthorized: (message, name) => {
    return errorBuilder('Unauthorized', 401, message || 'Authorization is required to access this resource', name || 'auth_required');
  },
  forbidden:    (message, name) => {
    return errorBuilder('Forbidden', 403, message || "You don't have enough rights to access this resource", name || 'access_denied');
  },
  notFound:     (message, name) => {
    return errorBuilder('NotFound', 404, message, name);
  },
  conflict:     (message, name) => {
    return errorBuilder('Conflict', 409, message, name);
  },
  internal:     (error) => {
    return errorBuilder('Internal', 500, "An internal error occurred", "internal_error");
  }
}