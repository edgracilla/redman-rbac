/* eslint-disable no-param-reassign */
/* eslint-disable security/detect-object-injection */

import jptr from 'jsonpointer';

const makeMessage = (action, field) => `You are not allowed to ${action} '${field}'.`;

export const translateVerbPerm = (xrud) => {
  const [POST, GET, PATCH, DELETE] = xrud;

  return {
    readOwned: GET === 'R',
    executeOwned: POST === 'X',
    updateOwned: PATCH === 'U',
    deleteOwned: DELETE === 'D',
  };
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

const stripNilArrItem = (obj) => {
  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const val = obj[key];

    if (typeof val === 'object') {
      if (Array.isArray(val)) {
        obj[key] = val.filter((e) => ![null, undefined].includes(e));
      } else {
        stripNilArrItem(obj[key]);
      }
    }
  }

  return obj;
};

export const checkPermAndCompile = (fields, patches, xrud) => {
  const [add, , upd, del] = xrud;

  const canAdd = add === 'X' || add === 'x';
  const canUpd = upd === 'U' || upd === 'u';
  const canDel = del === 'D' || del === 'd';

  const data = {};
  let hasArray = false;

  for (let i = 0; i < patches.length; i += 1) {
    const { op, path, value } = patches[i];
    const isArrayItem = /\/\d\//.test(path);

    if (op === 'add' && !canAdd) throw new Error(makeMessage('add', path));
    if (op === 'remove' && !canDel) throw new Error(makeMessage('delete', path));

    if (op === 'replace') {
      if (!canUpd) {
        throw new Error(makeMessage('update', path));
      }

      if (isArrayItem) {
        if (!fields.includes(path.replace(/\/\d\//g, '/*/'))) {
          throw new Error(makeMessage('update collection field', path));
        }
      } else if (!fields.includes(path)) {
        throw new Error(makeMessage('update field', path));
      }
    }

    if (['add', 'replace'].includes(op)) {
      if (!hasArray && isArrayItem) hasArray = isArrayItem;
      jptr.set(data, path, value);
    }
  }

  return stripNilArrItem(data);
};

export default {
  isVerbAuthorized,
  checkPermAndCompile,
};
