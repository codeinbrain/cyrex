import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import forEach from 'lodash/forEach';
import * as defaultResolvers from './defaultResolvers';
import { honeypager } from 'honey-pager';

const applyStatic = (modelSchema, name, resolver) => {
	modelSchema.statics[name] = resolver;
}

const applyResolvers = (srcPath, modelSchema) => {
	fs.readdirSync(srcPath)
	.filter((file) => {
		return file;
	}).forEach((file) => {
		const regex = /^([a-z0-9]+)\.js$/i;
	  const match = regex.exec(file);

	  if (!match) throw Error('Mutation or query files must be named like "myresolver.js"');
	  const name = match[1];

		const value = require(path.join(srcPath, file));
    if (!value.default) return;
		applyStatic(modelSchema, name, value.default);
	});
}

const composeModel = (modelName) => {
	const modelPath = path.join(__dirname, modelName);
  if (!fs.existsSync(modelPath)) {
    throw Error(`Cannot find requested model ${modelName}!`);
  }

  const modelSchema = require(path.join(modelPath, 'schema')).default;
  modelSchema.plugin(autopopulate);
  modelSchema.plugin(honeypager, { methodName: 'paginateForGraphQL' });

	forEach(defaultResolvers, (v, k) => applyStatic(modelSchema, k, v));

  const resolversPath = path.join(modelPath, 'resolvers');
  if (fs.existsSync(resolversPath)) {
    applyResolvers(resolversPath, modelSchema);
  }

	return mongoose.model(modelName, modelSchema);
}

export const User = composeModel('User');
export const Session = composeModel('Session');
