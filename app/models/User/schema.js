import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { rbac } from 'app/security';

const { ObjectId } = Schema.Types;

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    default: null
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  roles: {
    type: Array,
    default: ['user']
  }
}, {
  versionKey: false,
  timestamps: true,
});

schema.methods.can = async function(operation, ...args) {
  for (let role of this.roles) {
    if (await rbac.role(role).can(operation, ...args)) return Promise.resolve(true);
  }

  return Promise.resolve(false);
}

schema.methods.hasRole = function(role) {
  return this.roles.includes(role);
}

schema.pre('save', async function(next) {
  if (!this.isModified) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  } catch (err) {
    return next(err);
  }

  next();
});

export default schema;
