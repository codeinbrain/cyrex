/*
 * Resolvers defined here will be applied to
 * all the models of the current directory
 */

import ErrorQL from 'app/graphql/errors';

export const getById = function(_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const entity = await this.findOne({ _id });
      resolve(entity);
    } catch (e) {
      reject(ErrorQL.internal());
    }
  });
}

export const create = function(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const newObject = await (new this(data)).save();
      resolve(newObject);
    } catch (err) {
      reject(ErrorQL.internal());
    }
  });
}
