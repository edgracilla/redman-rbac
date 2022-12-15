/* eslint-disable security/detect-object-injection */

const arrSentries = ['_new', '_upd', '_del'];
const isNil = (value) => (value === null || value === undefined);
const intersection = (arr1 = [], arr2 = []) => arr1.filter((x) => arr2.includes(x));

const genMessageDefault = (parent, field) => {
  const path = parent ? `${parent}.` : '';
  return `You are not allowed to submit '${path}${field}' field.`;
};

const genMessageDrain = (parent, field) => {
  const path = parent ? `${parent}.` : '';
  return `You are not allowed to drain array field '${path}${field}'.`;
};

const genMessageSentry = (parent, field) => {
  const path = parent ? `${parent}.` : '';
  return `Array sentry (_new, _upd, _del) must be present in '${path}${field}'.`;
};

export const checkFieldPerm = (perms, data, parent) => {
  if (perms) {
    Object.keys(data).forEach((field) => {
      const value = data[field];
      const perm = perms[field];

      if (typeof value === 'object' && perm) {
        if (Array.isArray(value)) {
          if (value.length) {
            if (typeof value[0] === 'object' && perm) {
              if (typeof perm[0] === 'object' && perm.length) {
                value.forEach((val, i) => {
                  const permKeys = Object.keys(perm[0]);
                  const sentry = intersection(permKeys, arrSentries);
                  const path = parent ? `${parent}.${field}[${i}]` : `${field}[${i}]`;

                  if (sentry.length || !permKeys.length) {
                    checkFieldPerm(perm[0], val, path);
                  } else {
                    throw new Error(genMessageSentry(parent, path));
                  }
                });
              } else {
                throw new Error(genMessageDefault(parent, field));
              }
            } else if (perm === false) {
              throw new Error(genMessageDefault(parent, field));
            } else if (isNil(perm)) {
              if (perms['*'] === true || perms._others === true) {
                // noop
              } else {
                throw new Error(genMessageDefault(parent, field));
              }
            }
          } else {
            throw new Error(genMessageDrain(parent, field));
          }
        } else {
          const path = parent ? `${parent}.${field}` : field;
          checkFieldPerm(perm, data[field], path);
        }
      } else if (perm === false) {
        throw new Error(genMessageDefault(parent, field));
      } else if (isNil(perm)) {
        if (perms['*'] === true || perms._others === true) {
          if (Array.isArray(value) && !value.length) {
            throw new Error(genMessageDrain(parent, field));
          }
        } else {
          throw new Error(genMessageDefault(parent, field));
        }
      }
    });
  }
};

export const isVerbAuthorized = (xrud, verb) => {
  const [POST, GET, PATCH, DELETE] = xrud;
  let isAuthorized = false;

  switch (verb) {
    case 'GET': isAuthorized = GET === 'R' || GET === 'r'; break;
    case 'POST': isAuthorized = POST === 'X' || POST === 'x'; break;
    case 'PATCH': isAuthorized = PATCH === 'U' || PATCH === 'u'; break;
    case 'DELETE': isAuthorized = DELETE === 'D' || DELETE === 'd'; break;
    default: isAuthorized = false;
  }

  return isAuthorized;
};

export default {
  checkFieldPerm,
  isVerbAuthorized,
};
