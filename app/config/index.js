import { mongoConfig } from './config';

export const environment = process.env.NODE_ENV || 'development';
export const mongoUrl = mongoConfig.urls[environment] || ('mongodb://localhost:27017/' + mongoConfig.appName + '-' + environment)

// Port to run the app on
const defaultPort = (environment === 'production' ? 80 : 8000);
export const port = process.env.PORT || defaultPort;

/**
  Setting JWTSecret section.
  If JWTSecret is not set in a non development environment (such as staging
  or production), the app will throw an error. Otherwise, the application will
  try to get the value from the environment variable or setting it to a
  default value.
*/
let JWTSecret = process.env.JWT_SECRET;
if (!JWTSecret && (environment === 'development' || environment === 'test')) {
  JWTSecret = "development-secret";
}

if (!JWTSecret) {
  throw new Error("JWTSecret not set in a non development environment! This is a serious security issue!");
}

export { JWTSecret };
export { default as database } from './database';
export { default as roles } from './roles';
