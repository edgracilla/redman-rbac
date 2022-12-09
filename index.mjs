/* eslint-disable security/detect-object-injection */

import ApiError from './ApiError.mjs';

const isNil = (value) => (value === null || value === undefined);

const genMessageDefault = (parent, field) => {
  const path = parent ? `${parent}.` : '';
  return `You are not allowed to update '${path}${field}' field.`;
};

const genMessageDrain = (parent, field) => {
  const path = parent ? `${parent}.` : '';
  return `You are not allowed to drain array field '${path}${field}'.`;
};

export const checkFieldPerm = (updPerms, data, parent) => {
  if (updPerms) {
    Object.keys(data).forEach((field) => {
      const value = data[field];

      if (typeof value === 'object') {
        if (Array.isArray(value)) {
          if (value.length) {
            if (typeof value[0] === 'object') {
              value.forEach((val, i) => {
                const path = parent ? `${parent}.${field}[${i}]` : `${field}[${i}]`;
                checkFieldPerm(updPerms[field][0], val, path);
              });
            } else if (updPerms[field] === false) {
              throw new ApiError(403, genMessageDefault(parent, field));
            } else if (isNil(updPerms[field])) {
              if (updPerms['*'] === false) {
                throw new ApiError(403, genMessageDefault(parent, field));
              }
            }
          } else {
            throw new ApiError(403, genMessageDrain(parent, field));
          }
        } else {
          const path = parent
            ? `${parent}.${field}`
            : field;
          checkFieldPerm(updPerms[field], data[field], path);
        }
      } else if (updPerms[field] === false) {
        throw new ApiError(403, genMessageDefault(parent, field));
      } else if (isNil(updPerms[field])) {
        if (updPerms['*'] === false) {
          throw new ApiError(403, genMessageDefault(parent, field));
        }
      }
    });
  }
};

export default {
  checkFieldPerm,
};
