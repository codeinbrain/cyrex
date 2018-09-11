import { Logger, transports } from 'winston';

export default new Logger({
  level: 'info',
  transports: [
    new (transports.Console)({
      colorize: true
    })
  ]
});
