import mongoose, { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

const schema = mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  }
}, {
  versionKey: false,
  timestamps: true
});

export default schema;
