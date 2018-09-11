// MongoDB Configuration
export const mongoConfig = {
    // Required for default db name used in URLs
    // Use only alphanumerics characters, _ and -
    appName: 'cyrex',
    // All the URLs used to connect to your MongoDB
    urls: {
        // To add an URL for a specific environment,
        // write the name of the environment as a key
        // Examples:
        // production: 'mongodb://localhost/myapp-prod'
        // development: 'mongodb://localhost/myapp-dev'
        //
        // If nothing is specified for an environment,
        // the default URL will be mongodb://localhost/<appName>-<environment>
        staging: process.env.MONGODB_URI,
        production: process.env.MONGODB_URI
    }
}
