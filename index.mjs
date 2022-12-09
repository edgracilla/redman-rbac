/* eslint-disable security/detect-object-injection */

import ApiError from './ApiError.mjs';

export const recurCheckFieldPerm = (updPerms, content, parent) => {
  if (updPerms) {
    Object.keys(content).forEach((field) => {
      const value = content[field];

      if (!(value === null || value === undefined)) {
        if (typeof value === 'object') {
          if (Array.isArray(value)) {
            if (value.length) {
              if (typeof value[0] === 'object') {
                value.forEach((val, i) => {
                  const path = parent ? `${parent}.${field}[${i}]` : `${field}[${i}]`;
                  recurCheckFieldPerm(updPerms[field][0], val, path);
                });
              } else if (!updPerms[field]) {
                const path = parent ? `${parent}.` : '';
                throw new ApiError(403, `You are not allowed to update '${path}${field}' field.`);
              }
            } else {
              const path = parent ? `${parent}.` : '';
              throw new ApiError(403, `You are not allowed to drain array field '${path}${field}'.`);
            }
          } else {
            const path = parent ? `${parent}.${field}` : field;
            recurCheckFieldPerm(updPerms[field], content[field], path);
          }
        } else if (!updPerms[field]) {
          const path = parent ? `${parent}.` : '';
          throw new ApiError(403, `You are not allowed to update '${path}${field}' field.`);
        }
      }
    });
  }
};

export default {
  recurCheckFieldPerm,
};
