import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import graphQLHTTP from 'express-graphql';
import helmet from 'helmet';
import cors from 'cors';
import { formatError } from 'apollo-errors';
import { logger } from 'app/tools';
import { schema } from 'app/graphql';
import { port, environment } from 'app/config';
import { database } from 'app/config';
import { auth } from 'app/middlewares';

class Server {
  constructor() {
    this.app = express();
    this.configure();
  }

  configure() {
    this.app.use(morgan('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({
      extended: false
    }));

    this.app.use(helmet());
    this.app.use('/graphql', cors(), auth, graphQLHTTP((req, res, graphQLParams) => ({
      schema,
      formatError: (...args) => {
        logger.error(args[0]);
        return formatError(...args);
      },
      graphiql: true
    })));
  }

  async start() {
    try {
      await database.connect();
      logger.info(`Database successfully connected`);

      this.app.listen(port, () => {
        logger.info(`Application is running on port ${port}`);
        logger.info(`Selected environment is ${environment}`);
      });
    } catch(err) {
      logger.error(err);
    }
  }
}

export default new Server();
