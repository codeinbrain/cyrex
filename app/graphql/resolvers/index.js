import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import findIndex from 'lodash/findIndex';
import ErrorQL from 'app/graphql/errors';
import { rbac } from 'app/security';

const addPermissionValidator = (resolver) => {
	const initialResolve = resolver.resolve;
	const { permission } = resolver;

	if (!permission) return;

	resolver.resolve = async (...args) => {
		const user = args[2].viewer;
		if (user && !(await user.can(permission, ...args))) {
			throw ErrorQL.forbidden();
		}

		if (!user && !(await rbac.role('guest').can(permission, ...args))) {
			throw ErrorQL.unauthorized();
		}

		return initialResolve(...args);
	}
}

const getElementsInFolder = (folder) => {
	const srcPath = path.join(__dirname, folder);
	var obj = {};
	fs.readdirSync(srcPath)
	.filter((file) => {
		return file;
	}).forEach((file) => {
		const regex = /^([a-z0-9]+)\.js$/i;
	  const match = regex.exec(file);

	  if (!match) throw Error('Mutation or query files must be named like "myquery.js"');
	  const name = match[1];

		const { default: resolver } = require(path.join(srcPath, file));
		addPermissionValidator(resolver);

		const newObject = {};
		newObject[name] = resolver;
    obj = { ...obj, ...newObject }
	});

	return obj;
}

export const queries = getElementsInFolder('queries');
export const mutations = getElementsInFolder('mutations');
