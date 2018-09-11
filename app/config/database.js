import mongoose from 'mongoose';
import { mongoUrl } from 'app/config';

mongoose.Promise = require('bluebird');

export default {
  connect: () => mongoose.connect(mongoUrl, { useNewUrlParser: true }),
  disconnect: () => mongoose.disconnect()
}
